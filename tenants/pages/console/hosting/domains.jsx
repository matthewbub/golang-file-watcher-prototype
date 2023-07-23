import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ConsoleLayout } from '9mbs/components/ConsoleLayout';

export function Modal({ open, setOpen, data }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-7xl sm:p-6">
                <div>
                  <div className="mt-3 sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Debug Data
                    </Dialog.Title>
                    <div className="mt-2 text-gray-900 text-xs">
                      <pre>
                        <code>
                          {data && (
                            JSON.stringify(data, null, 2)
                          )}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setOpen(false)}
                  >
                    Go back to dashboard
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const Domain = ({ domain }) => {
  const [open, setOpen] = useState(false);

  return (
    <li className='flex flex-col'>
      <div className=''>
        <span className='text-green-500 underline' onClick={() => { setOpen(true) }}>Debug Domain</span>
        <span className='text-gray-500'>{' · '}</span>
        <span className='text-gray-500'>{domain.name} </span>
      </div>
      <Modal
        data={domain}
        open={open}
        setOpen={setOpen}
      />
    </li>
  )
}

const DeploymentsPage = ({ title, domains }) => {
  return (
    <ConsoleLayout
      primaryTitle={title}
      primary={() => (

        <ul className='space-y-4 list-disc pl-6'>
          {domains && domains.domains && domains.domains.length > 0 && domains.domains.map(domain => (
            <Domain key={domain.uid} domain={domain} />
          ))}
        </ul>

      )}
      breadcrumbs={[
        { name: 'Hosting', href: '/hosting', current: false },
        { name: 'Domains', href: '/hosting/domains', current: true },
      ]}
    />
  )
}

export const getServerSideProps = async (context) => {
  const vercelToken = process.env.NEXT_PUBLIC_VERCEL_TOKEN;

  const apiEndPt = 'https://api.vercel.com/v5/domains?teamId=' + process.env.NEXT_PUBLIC_VERCEL_TEAM_ID;

  let config = {
    method: 'get',
    url: apiEndPt,
    headers: {
      Authorization: 'Bearer ' + vercelToken,
    },
  };

  const unparsedDomains = await fetch(config.url, config)

  const domains = await unparsedDomains.json();

  console.log('Domains', domains)
  return {
    props: {
      title: 'Domains',
      domains
    }
  }
}

export default DeploymentsPage;