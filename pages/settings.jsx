import React from 'react';
import { Row, Col } from 'reactstrap';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Highlight from '../components/Highlight';
import DashboardLayout from '../components/DashboardLayout/DashboardLayout';
import { ProfileSettings } from '../components/ProfileSettings';

function Profile() {
  const { user, isLoading } = useUser();

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
