import { ConsoleLayout, Button, Stats } from '../../components';
import InitialClientEx from "./lifecycle/InitialClientEx";
import clsx from 'clsx';
import { NewDocumentForm, TableDisplay } from './components';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { statsConfig } from './constants';

const Page = ({
  consoleLayout,
  secondaryTabs = 'log',
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
    <InitialClientEx
      data={data}
    >
      <ConsoleLayout
        {...consoleLayout}
        primary={() => (
          <Fragment>
            <Stats stats={statsConfig.fallbackStats} />
            <TableDisplay />
          </Fragment>
        )}
        primaryAction={PrimaryAction}
        secondary={() => {
          return (
            <Fragment>
              <div className="border-b border-white/20">
                <nav className="-mb-px flex space-x-2 container-padding-x" aria-label="Tabs">
                  {secondaryTabs.map((tab) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      className={clsx(
                        tab.current
                          ? 'border-teal-500 text-teal-600'
                          : 'border-transparent text-gray-500 hover:border-white/30 hover:text-gray-700',
                        'whitespace-nowrap border-b-2 h-11 px-1 text-sm font-medium flex items-center'
                      )}
                      aria-current={tab.current ? 'page' : undefined}
                    >
                      {tab.name}
                    </a>
                  ))}
                </nav>
              </div>
              <div className='container-padding'>
                <NewDocumentForm />
              </div>
            </Fragment>
          )
        }}
      />
    </InitialClientEx>
  )
}

export default Page;
export { getServerSideProps } from './lifecycle/InitialServerEx';