import { useState, useEffect } from 'react';
import { ConsoleLayout } from '../../components/ConsoleLayout';
import { FullNavigation, navigation } from '../../components/AppNavigation';

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