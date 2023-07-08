import React from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import DashboardLayout from '../components/DashboardLayout/DashboardLayout';
import { ProfileSettings } from '../features/ProfileSettings';

function Profile() {
  const { isLoading } = useUser();

  return (
    <>
      {isLoading && <Loading />}
      <DashboardLayout
        mainContent={ProfileSettings}
      />
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
