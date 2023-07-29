import { ConsoleLayout } from '../../../components/ConsoleLayout';
import { FullNavigation, navigation } from '../../../components/AppNavigation';
import PathHandler from '../../../helpers/PathHandler';

const pathHandler = new PathHandler('console');

const Primary = () => (
  <FullNavigation navigation={navigation.find(nav => nav.name === 'Reddit Bot').children} />
);

const RedditBotHomePage = ({ primaryTitle, secondaryTitle }) => (
  <ConsoleLayout
    primaryTitle={primaryTitle}
    secondaryTitle={secondaryTitle}
    navigation={navigation}
    primary={Primary}
    breadcrumbs={[
      {
        name: 'Documents',
        href: pathHandler.getPath('documents'),
        current: true
      },
    ]}
  />
)

export { getServerSideProps } from '../../../ssp/console/documents/index';
export default RedditBotHomePage;
