import { ConsoleLayout } from '../../../components/ConsoleLayout';
import { FullNavigation, navigation } from '../../../components/AppNavigation';
import PathHandler from '../../../helpers/PathHandler';
import React, { useState } from 'react';
import Button from '../../../components/Button';
import { useRouter } from 'next/router';

const pathHandler = new PathHandler('console');

const Primary = () => (
  <FullNavigation navigation={navigation.find(nav => nav.name === 'Reddit Bot').children} />
);

const PrimaryAction = () => {
  const router = useRouter();
  const handleClick = async () => {
    const response = await fetch('/api/v1/secure/create-document')
    const data = await response.json();

    // TODO - handle error
    router.push('/documents/' + data.redirectId);
  }

  return (
    <Button onClick={handleClick}>
      {'Create new document'}
    </Button>
  )
}

const Page = ({ primaryTitle, secondaryTitle }) => (
  <ConsoleLayout
    primaryTitle={primaryTitle}
    secondaryTitle={secondaryTitle}
    navigation={navigation}
    primary={Primary}
    primaryAction={PrimaryAction}
    breadcrumbs={[
      {
        name: 'Documents',
        href: pathHandler.getPath('documents'),
        current: true
      },
    ]}
  />
)

export { getServerSideProps } from '../../../ssp/console/documents/index';
export default Page;
