import { sspWithAuth } from '../../helpers/sspWithAuth';

export const getServerSideProps = sspWithAuth(async (context) => {
  return {
    props: {
      consoleLayout: {
        primaryTitle: 'Time Logger',
        primaryTitleDescription: 'A place to track your time spent on projects.',
        breadcrumbs: [
          { name: 'Experimental', href: '/experimental', current: false },
          { name: 'Time Logger', href: '/experimental/time-logger', current: true }
        ]
      }
    }
  }
});
