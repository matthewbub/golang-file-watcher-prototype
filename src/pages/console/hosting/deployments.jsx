import { Fragment, useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { capitalize, get } from 'lodash';
import clsx from 'clsx';
import { uniqueId } from 'lodash';

import { Button } from '../../../components';
import { ConsoleLayout } from '../../../components/ConsoleLayout';
import { Stats } from '../../../components/Stats';

import PathHandler from '../../../helpers/PathHandler';
const pathHandler = new PathHandler('console');

const loadingAtom = atom(false);
const deploymentStatsAtom = atom([
  {
    name: 'Deploy Count',
    value: '-'
  },
  {
    name: 'Average Deploy Time',
    value: '-',
  },
  {
    name: 'Failed Deploys',
    value: '-',
  },
  {
    name: 'Successful Deploys',
    value: '-',
  }
]);

function Lifecycle({ children }) {
  const [_L, setLoading] = useAtom(loadingAtom);
  const [_D, setDeploymentStats] = useAtom(deploymentStatsAtom);

  useEffect(() => {
    setLoading(true);
    fetch('/api/v1/secure/vercel-api/lazily-get-deployment-stats')
      .then((res) => res.json())
      .then((res) => {
        const stats = get(res, 'data.stats', []);
        setDeploymentStats(stats);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

function Primary({ deployments = [] }) {
  const [loading] = useAtom(loadingAtom);
  const [deploymentStats] = useAtom(deploymentStatsAtom);
  const statuses = { Completed: 'text-green-400 bg-green-400/10', Error: 'text-rose-400 bg-rose-400/10', Running: 'text-blue-400 bg-blue-400/10 animated pulse' }
  return (
    <Lifecycle>
      <Stats loading={loading} stats={deploymentStats} />
      <table className="w-full whitespace-nowrap text-left">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-b border-neutral-900 text-sm leading-6 txt1 bg-neutral-900 sticky top-[63px]">
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
              Deployed
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {deployments && deployments.length > 0 && deployments.map((item) => (
            <tr key={uniqueId(item.commit)}>
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <a href={item.user.href} target='_blank'>
                    <img src={item.user.imageUrl} alt="" className="h-8 w-8 rounded-full bg-gray-800" />
                  </a>
                  <a href={item.user.href} target='_blank' className='text-sky-600	 hover:underline'>
                    <div className="truncate text-sm font-medium leading-6 txt1" >{item.user.name}</div>
                  </a>
                </div>
              </td>
              <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                <div className="flex gap-x-3">
                  <div className="font-mono text-sm leading-6 text-gray-400">
                    <a href={item.commitUrl} target='_blank' className='text-sky-600	 hover:underline'>{item.commit}</a>
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
                  <div className="hidden txt1 sm:block">
                    <a href={item.inspectorUrl} target='_blank' className='text-sky-600	 hover:underline'>{item.status}</a>
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
      <nav
        className="flex items-center justify-between border-t border-white/5 bg-neutral-900 px-4 py-3 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-neutral-500">
            Showing <span className="font-medium text-neutral-300">1</span> to <span className="font-medium text-neutral-300">10</span> of{' '}
            <span className="font-medium text-neutral-300">20</span> results
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end space-x-4">
          <Button disabled>{'Previous'}</Button>
          <Button>{'Next'}</Button>
        </div>
      </nav>
    </Lifecycle>
  )
}

export { getServerSideProps } from '@/ssp/console/hosting/deployments';
export default function Page({ deployments, consoleLayout }) {
  return (
    <ConsoleLayout
      {...consoleLayout}
      primary={() => <Primary deployments={deployments} />}
      breadcrumbs={[
        { name: 'Hosting', href: pathHandler.getPath('hosting'), current: false },
        { name: 'Deployments', href: pathHandler.getPath('hosting/deployments'), current: true },
      ]}
    />
  )
}
