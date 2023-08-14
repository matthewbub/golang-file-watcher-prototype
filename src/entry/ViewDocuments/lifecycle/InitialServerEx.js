import { get } from 'lodash';
import { sspWithAuth } from '../../../helpers/sspWithAuth';
import { supabase } from '../../../connections';
import { dayjs } from '../../../connections';

const fetchUserDocuments = async (user) => {
  return await supabase
    .from('users')
    .select(`email, id, documents (*)`)
    .eq('email', user.email)
    .single();
}

const fetchUserCategories = async (user) => {
  return await supabase
    .from('users')
    .select(`email, id, document_categories (*)`)
    .eq('email', user.email)
}

const fetchUniqueCategories = async (data) => {
  // 1. Collect all of the category fields in an array
  const categories = data.documents.map(doc => doc.category);

  // 2. Remove any falsey values
  const truthyCategories = categories.filter(Boolean);

  // 3. Remove any duplicate values
  const uniqueCategories = [...new Set(truthyCategories)];

  // Function to fetch a single category by ID
  async function fetchCategoryById(id) {
    const { data, error } = await supabase
      .from('document_categories')
      .select('category, id')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching category with ID ${id}:`, error);
      return { error: true };
    }

    return data;
  }

  // Fetch all categories concurrently
  const categoryNamesPromises = uniqueCategories.map(fetchCategoryById);
  const categoryNames = await Promise.all(categoryNamesPromises);

  return categoryNames.filter(Boolean);
}

const getTotalDocumentsByOwnerId = async (ownerId) => {
  const { data, error } = await supabase
    .from('documents')
    .select('*', { count: 'exact', head: true })
    .eq('owner_id', ownerId)

  console.log('[LOG]:', data)
  if (error) {
    console.error('Error fetching data:', error);
    return { error: true };
  }

  return data;
}

export const getServerSideProps = sspWithAuth(async (context, user) => {
  const currentTab = get(context, 'query.tab', 'new-document');

  // Collect all of the user's documents
  const { data, error } = await fetchUserDocuments(user);
  if (error) {
    return {
      props: {
        ...defaultProps,
        secondaryTabs: [
          { name: 'Add Document', href: '?tab=new-document', key: 'new-document', current: currentTab === 'new-document' },
        ],
      }
    }
  }

  // Collect all of categories in the `data.documentsList`
  const categoryNames = await fetchUniqueCategories(data);
  if (categoryNames.error) {
    return {
      props: {
        ...defaultProps,
        secondaryTabs: [
          { name: 'Add Document', href: '?tab=new-document', key: 'new-document', current: currentTab === 'new-document' },
        ],
      }
    }
  }

  // Collect all categories for the user
  const userCategories = await fetchUserCategories(data);
  if (userCategories.error) {
    return {
      props: {
        ...defaultProps,
        secondaryTabs: [
          { name: 'Add Document', href: '?tab=new-document', key: 'new-document', current: currentTab === 'new-document' },
        ],
      }
    }
  };
  const userCategoriesList = get(userCategories, 'data[0].document_categories', []);

  // TODO Doesn't work but is for the Stats section
  // const totalDocuments = await getTotalDocumentsByOwnerId(data.id);
  // console.log('totalDocuments:', totalDocuments, data.id);

  // `data.documents` is used to populate the table rows
  const formattedTableRowData = data.documents.reduce((acc, curr) => {
    return [
      ...acc,
      {
        documentTitle: curr.document_title,
        documentCategory: categoryNames.find(cat => cat.id === curr.category)?.category || 'Uncategorized',
        dateCreated: dayjs(curr.created_at).fromNow(),
        lastUpdated: dayjs(curr.updated_at).fromNow(),
        documentId: curr.id,
        documentOwnerId: curr.owner_id,
        documentVisibility: curr.visibility,
        documentDescription: curr.document_description,
        documentUrl: curr.slug,
        documentSeoTitle: curr.page_title,
      }
    ]
  }, []);

  // `data.accordionsList` is used to control the open/close state of the accordions
  const formattedTableRowAccordions = data.documents.reduce((acc, curr) => {
    return ({
      ...acc,
      [curr.id]: false
    })
  }, false);

  return {
    props: {
      consoleLayout: {
        primaryTitle: 'Documents',
        primaryTitleDescription: 'View and manage your documents',
        breadcrumbs: [
          { name: 'Documents', href: '/documents', current: true },
        ]
      },
      secondaryTabs: [
        { name: 'Add Document', href: '?tab=new-document', key: 'new-document', current: currentTab === 'new-document' },
      ],
      data: {
        documentsList: formattedTableRowData,
        accordionsList: formattedTableRowAccordions,
        categoriesList: userCategoriesList,
      }
    }
  }
});


const defaultProps = {
  consoleLayout: {
    primaryTitle: 'Documents',
    primaryTitleDescription: 'View and manage your documents',
    breadcrumbs: [
      { name: 'Documents', href: '/documents', current: true },
    ]
  },
  data: null,
}