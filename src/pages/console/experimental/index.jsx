import { ConsoleLayout, FullNavigation } from '../../../components';
import { consoleNavigation as navigation } from '../../../constants';

const Page = ({ primaryTitle, secondaryTitle }) => {
  return (
    <ConsoleLayout
      primaryTitle={primaryTitle}
      secondaryTitle={secondaryTitle}
      navigation={navigation}
      primary={() => <FullNavigation navigation={navigation.find(nav => nav.name === 'Experimental Features').children} />}
      breadcrumbs={[
        { name: 'Experimental', href: '/experimental', current: true }
      ]}
    />
  )
}


export { getServerSideProps } from '../../../ssp/console/experimental/experimental__home';

export default Page;