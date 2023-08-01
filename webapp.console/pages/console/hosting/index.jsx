import { supabase } from '@/supabase.config';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ConsoleLayout } from '../../../components/ConsoleLayout';
import { FullNavigation, navigation } from '../../../components/AppNavigation';

const HostingHomePage = ({ primaryTitle, secondaryTitle }) => {
  return (
    <ConsoleLayout
      primaryTitle={primaryTitle}
      secondaryTitle={secondaryTitle}
      navigation={navigation}
      primary={() => <FullNavigation navigation={navigation.find(nav => nav.name === 'Hosting').children} />}
      breadcrumbs={[
        { name: 'Hosting', href: '/hosting', current: true }
      ]}
    />
  )
}

export { getServerSideProps } from '../../../ssp/console/hosting/hosting__home';
export default HostingHomePage;