import PathHandler from '@/helpers/PathHandler';
const pathHandler = new PathHandler('console');

export const getServerSideProps = async () => {
  return {
    props: {
      consoleLayout: {
        primaryTitle: 'Website Builder - ALPHA',
        breadcrumbs: [
          {
            name: 'Website Builder',
            href: pathHandler.getPath('website-builder'),
            current: true
          },
        ]
      }
    }
  }
}