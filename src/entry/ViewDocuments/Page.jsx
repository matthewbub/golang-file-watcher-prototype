import { ConsoleLayout, Button, Stats } from '../../components';
import InitialClientEx from "./lifecycle/InitialClientEx";
import { Table } from './components';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { statsConfig } from './constants';
import ClientObserver from './lifecycle/ClientObserver';

const Page = ({
  consoleLayout,
  data = {}
}) => {
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

  return (
    <InitialClientEx data={data}>
      <ClientObserver>
        <ConsoleLayout
          {...consoleLayout}
          primary={() => (
            <Fragment>
              {/* <Stats stats={statsConfig.fallbackStats} /> */}
              <Table />
            </Fragment>
          )}
          primaryAction={PrimaryAction}
        />
      </ClientObserver>
    </InitialClientEx>
  )
}

export default Page;
export { getServerSideProps } from './lifecycle/InitialServerEx';