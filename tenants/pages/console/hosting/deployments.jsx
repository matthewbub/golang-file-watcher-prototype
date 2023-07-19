import { supabase } from '9mbs/supabase.config';
import { useEffect } from 'react';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';
import { capitalize } from 'lodash';

dayjs.locale('en');
dayjs.extend(relativeTime);

export function DeploymentsTable({ deployments = [] }) {
  const statuses = { Completed: 'text-green-400 bg-green-400/10', Error: 'text-rose-400 bg-rose-400/10', Running: 'text-blue-400 bg-blue-400/10 animated pulse' }
  return (
    <div className="py-10">
      <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">Latest activity</h2>
      <table className="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-b border-white/10 text-sm leading-6 text-white">
          <tr>
            <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
              User
            </th>
            <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
              Commit
            </th>
            <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
              Status
            </th>
            <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
              Duration
            </th>
            <th scope="col" className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8">
              Deployed at
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {deployments && deployments.length > 0 && deployments.map((item) => (
            <tr key={item.commit}>
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <a href={item.user.href} target='_blank'>
                    <img src={item.user.imageUrl} alt="" className="h-8 w-8 rounded-full bg-gray-800" />
                  </a>
                  <a href={item.user.href} target='_blank'>
                    <div className="truncate text-sm font-medium leading-6 text-white">{item.user.name}</div>
                  </a>
                </div>
              </td>
              <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                <div className="flex gap-x-3">
                  <div className="font-mono text-sm leading-6 text-gray-400">
                    <a href={item.commitUrl} target='_blank'>{item.commit}</a>
                  </div>
                  {item.target && (
                    <div className="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-white/10">
                      {capitalize(item.target)}
                    </div>
                  )}
                </div>
              </td>
              <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                  <time className="text-gray-400 sm:hidden" dateTime={item.dateTime}>
                    {item.date}
                  </time>
                  <div className={clsx(statuses[item.status], 'flex-none rounded-full p-1')}>
                    <div className="h-1.5 w-1.5 rounded-full bg-current" />
                  </div>
                  <div className="hidden text-white sm:block">
                    <a href={item.inspectorUrl} target='_blank'>{item.status}</a>
                  </div>
                </div>
              </td>
              <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                {item.duration === '0' ? '-' : item.duration + 's'}
              </td>
              <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                <time dateTime={item.dateTime}>{item.date}</time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


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

const DeploymentsPage = ({ title, deployments: { deployments, pagination }, formattedDeployments }) => {
  return (
    <div className='mx-auto max-w-7xl p-12'>
      <DeploymentsTable deployments={formattedDeployments} />
      <h1 className='text-4xl mb-12'>{title}</h1>
      <h2 className='text-2xl mb-4'>Recent Deployments</h2>
      {/* <ul className='space-y-4 list-disc pl-6'>
        {deployments && deployments.length > 0 && deployments.map(deployment => (
          <Deployment key={deployment.uid} deployment={deployment} />
        ))}
      </ul> */}
    </div>
  )
}

// user: {
//   name: 'Michael Foster',
//   imageUrl:
//     'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// },
// commit: '2d89f0c8',
//  target: 'main',
// status: 'Completed',
// duration: '25s',
// date: '45 minutes ago',
// dateTime: '2023-01-23T11:00',

export const getServerSideProps = async (context) => {
  const vercelToken = process.env.NEXT_PUBLIC_VERCEL_TOKEN;
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

  const authors = deployments.deployments.map(deployment => deployment.creator.githubLogin)
  const uniqueAuthors = [...new Set(authors)]

  const authorDetails = await Promise.all(uniqueAuthors.map(async author => {
    const authorConfig = {
      method: 'get',
      url: `https://api.github.com/users/${author}`,
      // headers: {
      //   Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_GITHUB_TOKEN,
      // },
    };
    const authorDetails = await fetch(authorConfig.url, authorConfig)
    const authorDetailsJson = await authorDetails.json();
    return authorDetailsJson
  }));

  const formattedAuthors = authorDetails.reduce((acc, author) => {
    return ({
      ...acc,
      [author.login]: {
        name: author.name,
        avatar_url: author.avatar_url,
        html_url: author.html_url,
      }
    })
  }, {});

  console.log('formattedAuthors', formattedAuthors)
  // console.log('authorDetails', authorDetails)

  const formattedDeployments = deployments.deployments.reduce((acc, deployment) => {
    const duration = dayjs(deployment.ready).diff(dayjs(deployment.buildingAt), 's');
    const status = (
      deployment.state === 'READY' ? 'Completed' : deployment.state === 'ERROR' ? 'Error' : 'Running'
    )
    console.log('deployment target', duration)
    return ([
      ...acc,
      {
        user: {
          name: deployment.creator.githubLogin,
          imageUrl: formattedAuthors[deployment.creator.githubLogin].avatar_url,
          href: formattedAuthors[deployment.creator.githubLogin].html_url,
        },
        dateTime: dayjs(deployment.createdAt).format('YYYY-MM-DDTHH:mm'),
        date: dayjs.unix(deployment.createdAt / 1000).fromNow(),
        buildingAt: deployment.buildingAt,
        ready: deployment.ready,
        state: deployment.state,
        duration,
        commit: deployment.meta.githubCommitSha.slice(0, 7),
        commitUrl: 'https://github.com/' + deployment.meta.githubOrg + '/' + deployment.meta.githubRepo + '/commit/' + deployment.meta.githubCommitSha,
        target: deployment.target,
        inspectorUrl: deployment.inspectorUrl,
        status
      }
    ])
  }, []);




  return {
    props: {
      title: 'Deployments',
      deployments,
      formattedDeployments
    }
  }
}

export default DeploymentsPage;