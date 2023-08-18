import { get } from 'lodash';
import { sspWithAuth } from '../../../helpers/sspWithAuth';
import { dayjs } from '../../../connections';
import {
  getUserByEmail,
  getDocumentsByUserId,
  getDocumentCountByUserId,
  getUserCategories
} from "../../../queries";

const getTotalDocumentsByOwnerId = async (user) => {
  const userDocumentCount = await getDocumentCountByUserId(user.email);
  return userDocumentCount;
}

export const getServerSideProps = sspWithAuth(async (context, user) => {
  const {data: userData, error: userError} = await getUserByEmail(user.email);
  if (!userError.isSuccessful) {
    console.error(`Error fetching user with email ${user.email}:`, userError);
    return defaultProps;
  }

  const {data: userDocumentsData, error: userDocumentsError} = await getDocumentsByUserId(userData?.user?.id, { limit: 10, order: 'created_at,desc' });
  if (!userDocumentsError.isSuccessful) {
    console.error(`Error fetching documents for user with ID ${userData.user.id}:`, userDocumentsError);
    return defaultProps;
  }

  const documents = userDocumentsData.documents;

  // Collect all categories for the user
  const {data: userCategoriesData, error: userCategoriesError} = await getUserCategories(user.email);
  if (!userCategoriesError.isSuccessful) {
    console.error(`Error fetching categories for user with email ${user.email}:`, userCategoriesError);
    return defaultProps;
  }

  const userCategoriesList = get(userCategoriesData, 'data[0].document_categories', []);
  const formattedUserCategoriesList = userCategoriesList.reduce((acc, curr) => {
    return [
      ...acc,
      {
        id: curr.id,
        name: curr.category,
      }
    ]
  }, []);

  const totalDocuments =  await getDocumentCountByUserId(userData.user.id)
  // console.log('totalDocuments:', totalDocuments);

  // `data.documents` is used to populate the table rows
  const formattedTableRowData = documents.reduce((acc, curr) => {
    return [
      ...acc,
      {
        documentTitle: curr.document_title,
        documentCategory: curr.category,
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
  const formattedTableRowAccordions = documents.reduce((acc, curr) => {
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