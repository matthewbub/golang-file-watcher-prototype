import { ConsoleLayout, Input, Button, TextArea, Select } from '../../components';
import InitialClientEx from "./InitialClientEx";
import { useForm } from 'react-hook-form';
import { formatTime } from '../../constants';
import clsx from 'clsx';
import { ProjectForm, TableDisplay } from './components';
import { Fragment } from 'react';
const Page = ({
  consoleLayout,
  secondaryTabs = 'log'
}) => {
  const { register } = useForm();

  return (
    <InitialClientEx>
      <ConsoleLayout {...consoleLayout}
        primary={() => (
          <TableDisplay />
        )}
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
                <ProjectForm />
              </div>
            </Fragment>
          )
        }}
      />
    </InitialClientEx>
  )
}

export default Page;
export { getServerSideProps } from './InitialServerEx';