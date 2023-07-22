import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ConsoleLayout } from '9mbs/components/ConsoleLayout';
import { supabase } from '../../../../supabase.config'
dayjs.locale('en');
dayjs.extend(relativeTime);

export function Table({ data = [] }) {
  return (
    <table className="mt-6 w-full whitespace-nowrap text-left">
      <colgroup>
        <col className="w-full sm:w-4/12" />
        <col className="lg:w-4/12" />
        <col className="lg:w-2/12" />
        <col className="lg:w-2/12" />
      </colgroup>
      <thead className="border-b border-white/10 text-sm leading-6 text-white">
        <tr>
          <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
            Sub Reddit
          </th>
          <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
            Last Seen
          </th>
          <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
            Is SFW
          </th>
          <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">

          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {data && data.length > 0 && data.map((row, i) => (
          <tr key={i} className="text-sm leading-6 text-white">
            <td className="py-3 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div className="flex items-center">
                <div className="text-sm font-medium text-white">{'r/'}{row.subreddit}</div>
                <div className="text-sm text-gray-400">{row.display_name}</div>
              </div>
            </td>
            <td className="hidden py-3 pl-0 pr-8 sm:table-cell">
              <div className="text-sm text-gray-400">{dayjs(row.last_seen).fromNow()}</div>
            </td>

            <td className="py-3 pl-0 pr-4 text-right sm:pr-8 sm:text-left lg:pr-20">
              <span className={clsx('px-2 inline-flex text-xs leading-5 font-semibold rounded-full', !row.is_nsfw ? 'bg-red-400 text-red-100' : 'bg-green-400 text-green-100')}>
                {!row.is_nsfw ? 'Yes' : 'No'}
              </span>
            </td>
            <td className="py-3 pl-0 pr-4 text-right sm:pr-8 sm:text-left lg:pr-20">
              <a href="#" className="text-indigo-400 hover:text-indigo-500">
                <span className="sr-only">View</span>
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">

                  <path fillRule="evenodd" d="M10.707 3.293a1 1 0 010 1.414L7.414 9H13a1 1 0 110 2H7.414l3.293 3.293a1 1 0 11-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z" clipRule="evenodd" />

                </svg>
              </a>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
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

const SubRedditsPage = ({ title, data }) => {
  return (
    <ConsoleLayout
      primaryTitle={title}
      primary={() => (
        <div className='mx-auto max-w-7xl p-12'>
          <Table data={data} />
        </div>
      )}
    />
  )
}

export const getServerSideProps = async () => {
  const { data, error } = await supabase
    .from('subreddits')
    .select('*')
    .order('last_seen', {
      ascending: false,
    })
    .limit(10)

  if (error) {
    console.log(error)
    return {
      props: {
        title: 'Subs',
        data: []
      }
    }
  }

  return {
    props: {
      title: 'Subs',
      data
    }
  }
}

export default SubRedditsPage;