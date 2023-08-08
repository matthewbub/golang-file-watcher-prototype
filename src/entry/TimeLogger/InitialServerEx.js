import { get } from 'lodash';
import { sspWithAuth } from '../../helpers/sspWithAuth';

export const getServerSideProps = sspWithAuth(async (context) => {
  const currentTab = get(context, 'query.t', 'log');
  const tabs = [
    { name: 'Add Project', href: '?t=projects', key: 'projects', current: currentTab === 'projects' },
    { name: 'Log Time', href: '?t=log', key: 'log', current: currentTab === 'log' },
  ]

  return {
    props: {
      consoleLayout: {
        primaryTitle: 'Time Logger',
        primaryTitleDescription: 'A place to track your time spent on projects.',
        breadcrumbs: [
          { name: 'Experimental', href: '/experimental', current: false },
          { name: 'Time Logger', href: '/experimental/time-logger', current: true }
        ]
      },
      secondaryTabs: [
        { name: 'Add Project', href: '?t=projects', key: 'projects', current: currentTab === 'projects' },
        { name: 'Log Time', href: '?t=log', key: 'log', current: currentTab === 'log' },
      ]
    }
  }
});
