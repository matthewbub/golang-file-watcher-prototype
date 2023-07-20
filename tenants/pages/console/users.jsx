import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';
import { capitalize, isEmpty } from 'lodash';
import { get } from 'lodash';
import { ConsoleLayout } from '9mbs/components/ConsoleLayout';

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

      </table>
    </div>
  )
}


const UsersPage = ({ primaryTitle, secondaryTitle }) => {
  return (
    <ConsoleLayout
      reverseLayout={true}
      primary={() => (<h2>Hello!!</h2>)}
      secondary={() => (<h2>Hello!!</h2>)}
      primaryTitle={primaryTitle}
      secondaryTitle={secondaryTitle}
    />
  )
}

export const getServerSideProps = async () => {
  return {
    props: {
      primaryTitle: 'Users',
      secondaryTitle: 'Recent actions'
    }
  }
}

export default UsersPage;