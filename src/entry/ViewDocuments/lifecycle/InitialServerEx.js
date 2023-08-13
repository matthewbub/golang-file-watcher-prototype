import { get } from 'lodash';
import { sspWithAuth } from '../../../helpers/sspWithAuth';
import { tableConfig } from '../constants';
import { supabase } from '../../../connections';

export const getServerSideProps = sspWithAuth(async (context, user) => {
  const currentTab = get(context, 'query.tab', 'new-document');
  const { data, error } = await supabase
    .from('users')
    .select(`
      email,
      documents (
          *
      )
  `)
    .eq('email', user.email)
    .single();

  if (error) {
    console.log('error', error);
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
        data: tableConfig.data
      }
    }
  }

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
      return null;
    }

    return data;
  }

  // Fetch all categories concurrently
  const categoryNamesPromises = uniqueCategories.map(fetchCategoryById);
  const categoryNames = await Promise.all(categoryNamesPromises);

  // Filter out any null values (in case of errors)
  const validCategoryNames = categoryNames.filter(Boolean);

  const formattedTableRowData = data.documents.reduce((acc, curr) => {
    return [
      ...acc,
      {
        1: curr.document_title,
        2: validCategoryNames.find(cat => cat.id === curr.category)?.category || 'General',
        3: curr.created_at,
        4: 'Edit',
      }
    ]
  }, []);
  console.log('data', formattedTableRowData);

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
      data: tableConfig.data
    }
  }
});
