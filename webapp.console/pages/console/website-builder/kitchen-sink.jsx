import { ConsoleLayout } from '../../../components/ConsoleLayout';
import { FullNavigation, navigation } from '../../../components/AppNavigation';
import PathHandler from '../../../helpers/PathHandler';

const pathHandler = new PathHandler('console');

const Primary = () => (
  <FullNavigation navigation={navigation.find(nav => nav.name === 'Website Builder').children} />
);

const Page = ({ primaryTitle, secondaryTitle }) => (
  <ConsoleLayout
    primaryTitle={primaryTitle}
    secondaryTitle={secondaryTitle}
    navigation={navigation}
    primary={Primary}
    breadcrumbs={[
      {
        name: 'Website Builder',
        href: pathHandler.getPath('website-builder'),
        current: false
      },
      {
        name: 'Kitchen Sink',
        href: pathHandler.getPath('website-builder/kitchen-sink'),
        current: true
      },
    ]}
  />
)

export { getServerSideProps } from '../../../ssp/console/reddit-bot/reddit-bot__home';
export default Page;
