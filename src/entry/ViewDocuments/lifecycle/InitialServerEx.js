import { get } from 'lodash';
import { sspWithAuth } from '../../../helpers/sspWithAuth';
import { supabase } from '../../../connections';
import { dayjs } from '../../../connections';
import {
  getUserByEmail,
  getDocumentsByUserId,
  getDocumentCountByUserId
} from "../../../queries";

const fetchUserDocuments = async (user) => {
  const {data: userData, error: userError} = await getUserByEmail(user.email);
  if (!userError.isSuccessful) {
    console.error(`Error fetching user with email ${user.email}:`, userError);
    return userError;
  }

  const {data: userDocumentsData, error: userDocumentsError} = await getDocumentsByUserId(userData?.user?.id, { limit: 10, order: 'created_at,desc' });
  if (!userDocumentsError.isSuccessful) {
    console.error(`Error fetching documents for user with ID ${userData.user.id}:`, error);
    return error;
  }

  return userDocumentsData.documents;
}

const fetchUserCategories = async (user) => {
  return await supabase
    .from('users')
    .select(`email, id, document_categories (*)`)
    .eq('email', user.email)
}

const fetchUniqueCategories = async (data) => {
  // 1. Collect all of the category fields in an array
  const categories = data.map(doc => doc.category);

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

const getTotalDocumentsByOwnerId = async (user) => {
  const userDocumentCount = await getDocumentCountByUserId(user.email);
  return userDocumentCount;
}

export const getServerSideProps = sspWithAuth(async (context, user) => {
  const currentTab = get(context, 'query.tab', 'new-document');

  // Collect all of the user's documents
  const data = await fetchUserDocuments(user);
  // if (error) {
  //   return {
  //     props: {
  //       ...defaultProps,
  //       secondaryTabs: [
  //         { name: 'Add Document', href: '?tab=new-document', key: 'new-document', current: currentTab === 'new-document' },
  //       ],
  //     }
  //   }
  // }
  console.log('data: 123', data)

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
  const formattedUserCategoriesList = userCategoriesList.reduce((acc, curr) => {
    return [
      ...acc,
      {
        id: curr.id,
        name: curr.category,
      }
    ]
  }, []);

  // const totalDocuments = await getTotalDocumentsByOwnerId(user.email);

  // `data.documents` is used to populate the table rows
  const formattedTableRowData = data.reduce((acc, curr) => {
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
  const formattedTableRowAccordions = data.reduce((acc, curr) => {
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
        categoriesList: formattedUserCategoriesList,
        // documentCount: totalDocuments,
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