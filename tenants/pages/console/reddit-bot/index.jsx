import { supabase } from '9mbs/supabase.config';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ConsoleLayout } from '../../../components/ConsoleLayout';
import { FullNavigation, navigation } from '../../../components/AppNavigation';

const RedditBotHomePage = ({ primaryTitle, secondaryTitle }) => {
  return (
    <ConsoleLayout
      primaryTitle={primaryTitle}
      secondaryTitle={secondaryTitle}
      navigation={navigation}
      primary={() => <FullNavigation navigation={navigation.find(nav => nav.name === 'Reddit Bot').children} />}
      breadcrumbs={[
        { name: 'Reddit Bot', href: '/reddit-bot', current: true },
      ]}
    />
  )
}

export const getServerSideProps = async (context) => {
  return {
    props: {
      primaryTitle: 'Reddit Bot',
      secondaryTitle: 'Recent deployments',
    }
  }
}

export default RedditBotHomePage;