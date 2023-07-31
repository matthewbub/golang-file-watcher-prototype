import { supabase } from '9mbs/supabase.config';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ConsoleLayout } from '../../../components/ConsoleLayout';
import { FullNavigation, navigation } from '../../../components/AppNavigation';

const EndlessCheckboxes = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Endless Checkboxes</h1>
    </div>
  )
};

const Page = ({ primaryTitle, secondaryTitle }) => {
  return (
    <ConsoleLayout
      primaryTitle={primaryTitle}
      secondaryTitle={secondaryTitle}
      navigation={navigation}
      primary={EndlessCheckboxes}
      breadcrumbs={[
        { name: 'Experimental', href: '/experimental', current: false },
        { name: 'Endless Checkboxes', href: '/experimental/endless-checkboxes', current: true }
      ]}
    />
  )
}

export { getServerSideProps } from '../../../ssp/console/hosting/hosting__home';
export default Page;