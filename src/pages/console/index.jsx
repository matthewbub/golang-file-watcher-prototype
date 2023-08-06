import { ConsoleLayout, FullNavigation } from '../../src/components';
import { consoleNavigation as navigation } from '../../console.navigation';

const HomePage = ({ primaryTitle, secondaryTitle }) => {
  return (
    <ConsoleLayout
      primaryTitle={primaryTitle}
      secondaryTitle={secondaryTitle}
      navigation={navigation}
      primary={() => <FullNavigation navigation={navigation.filter((item) => item.name !== 'Console')} />}
      breadcrumbs={[
        // { name: 'Homd', href: '/', current: true }
      ]}
    />
  )
}

export { getServerSideProps } from '../../ssp/console/index';
export default HomePage;