import { ConsoleLayout, FullNavigation } from '../../../components';
import { consoleNavigation as navigation } from '../../../constants';

const Page = ({ primaryTitle, secondaryTitle }) => {
  return (
    <ConsoleLayout
      primaryTitle={primaryTitle}
      secondaryTitle={secondaryTitle}
      navigation={navigation}
      primary={() => <FullNavigation navigation={navigation.find(nav => nav.name === 'Hosting & Git').children} />}
      breadcrumbs={[
        { name: 'Hosting', href: '/hosting', current: true }
      ]}
    />
  )
}

export { getServerSideProps } from '../../../ssp/console/hosting/hosting__home';
export default Page;