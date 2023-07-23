import clsx from 'clsx';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('en');
dayjs.extend(relativeTime);

import { isEmpty } from 'lodash';
import { get } from 'lodash';
import { ConsoleLayout } from '9mbs/components/ConsoleLayout';
import { supabase } from '../../../../supabase.config'


export function Table({ data = [] }) {
  const statuses = { Completed: 'text-green-400 bg-green-400/10', Error: 'text-rose-400 bg-rose-400/10', Running: 'text-blue-400 bg-blue-400/10 animated pulse' }
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
        {data.map((row, i) => (
          <tr key={i} className="text-sm leading-6 text-white">
            <td className="py-3 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <a href={`/reddit-bot/subs/${row.subreddit}`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img className="w-10 h-10 rounded-full" src={row.icon} alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">{'r/'}{row.subreddit}</div>
                    <div className="text-sm text-gray-400">{row.display_name}</div>
                  </div>
                </div>
              </a>
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


const SubRedditsPage = ({ title, data }) => {
  return (
    <ConsoleLayout
      primaryTitle={title}
      primary={() => (
        <div className='mx-auto max-w-7xl p-12'>
          {/* <Table data={data} /> */}
        </div>
      )}
      breadcrumbs={[
        { name: 'Reddit Bot', href: '/reddit-bot', current: false },
        { name: 'Subs', href: '/reddit-bot/subs', current: false },
        { name: data.subreddit, href: `/reddit-bot/subs/${data.subreddit}`, current: true }
      ]}
    />
  )
}

export const getServerSideProps = async (context) => {
  const subreddit = get(context, 'params.subreddit', null);

  console.log('context', context)
  const { data, error } = await supabase
    .from('subreddits')
    .select('*')
    .eq('subreddit', subreddit)
    .single()

  if (isEmpty(data.lang)) {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/about.json`)
    const json = await response.json()

    const { error: error2 } = await supabase
      .from('subreddits')
      .update({
        lang: get(json, 'data.lang', null),
        created_utc: get(json, 'data.created_utc', null),
        advertiser_category: get(json, 'data.advertiser_category', null),
        public_description: get(json, 'data.public_description', null),
        description_html: get(json, 'data.description_html', null),
        display_name: get(json, 'data.display_name', null),
      })
      .eq('subreddit', subreddit)
      .select()


    console.log('json', json)
  }


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