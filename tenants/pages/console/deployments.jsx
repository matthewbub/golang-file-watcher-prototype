import { supabase } from '../../supabase.config';
import { useEffect } from 'react';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'

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

const Deployment = ({ deployment }) => {
  const [open, setOpen] = useState(false);

  return (
    <li className='flex flex-col'>
      <div className=''>
        <a href={deployment.inspectorUrl} target='_blank' className='text-blue-500 underline'>Inspect Deployment</a>
        <span className='text-gray-500'>{' · '}</span>
        <span className='text-green-500 underline' onClick={() => { setOpen(true) }}>Debug Deployment</span>
        <span className='text-gray-500'>{' · '}</span>
        <span className='text-gray-500'>Created by {deployment.creator.email} on {new Date(deployment.createdAt).toLocaleString()} </span>
      </div>
      <Modal
        data={deployment}
        open={open}
        setOpen={setOpen}
      />
    </li>
  )
}

const DeploymentsPage = ({ title, deployments: { deployments, pagination } }) => {
  return (
    <div className='mx-auto max-w-7xl p-12'>
      <h1 className='text-4xl mb-12'>{title}</h1>

      {console.log(deployments)}
      <h2 className='text-2xl mb-4'>Recent Deployments</h2>
      <ul className='space-y-4 list-disc pl-6'>
        {deployments && deployments.length > 0 && deployments.map(deployment => (
          <Deployment key={deployment.uid} deployment={deployment} />
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps = async (context) => {

  const { data, error } = await supabase.from('tenants').select('*');

  if (error) {
    console.log(error);
  }

  const vercelToken = process.env.NEXT_PUBLIC_VERCEL_TOKEN;
  //Replace with your token
  const apiEndPt = 'https://api.vercel.com/v6/deployments?teamId=' + process.env.NEXT_PUBLIC_VERCEL_TEAM_ID;

  let config = {
    method: 'get',
    url: apiEndPt,
    headers: {
      Authorization: 'Bearer ' + vercelToken,
    },
  };

  const unparsedDeployments = await fetch(config.url, config)

  const deployments = await unparsedDeployments.json();

  return {
    props: {
      title: 'Deployments',
      deployments
    }
  }
}

export default DeploymentsPage;