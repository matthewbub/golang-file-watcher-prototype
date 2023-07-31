import { ConsoleLayout } from '../../../components/ConsoleLayout';
import { navigation } from '../../../components/AppNavigation';
import PathHandler from '../../../helpers/PathHandler';
import React from 'react';
import Button from '../../../components/Button';
import { Table } from '../../../components/__BaseComponents/CompactTable__Documents';
import { useRouter } from 'next/router';

const pathHandler = new PathHandler('console');

const Primary = ({ data }) => (
  <div>
    <Table data={data} />
  </div>
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

const Page = ({ primaryTitle, secondaryTitle, data }) => (
  <ConsoleLayout
    primaryTitle={primaryTitle}
    secondaryTitle={secondaryTitle}
    navigation={navigation}
    primary={() => <Primary data={data} />}
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
