import { get } from 'lodash';
import { sspWithAuth } from '../../helpers/sspWithAuth';

export const getServerSideProps = sspWithAuth(async (context) => {
  const currentTab = get(context, 'query.tab', 'new-document');
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
      ]
    }
  }
});
