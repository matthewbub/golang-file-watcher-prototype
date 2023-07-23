import dayjs from 'dayjs';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('en');
dayjs.extend(relativeTime);

import { isEmpty } from 'lodash';
import { get } from 'lodash';
import { ConsoleLayout } from '9mbs/components/ConsoleLayout';
import { supabase } from '../../../../supabase.config'
import DataDisplay__SubReddit from '../../../../components/__BaseComponents/DataDisplay__SubReddit';

const SubRedditsPage = ({ title, description, data }) => {
  return (
    <ConsoleLayout
      primaryTitle={title}
      primaryTitleDescription={description}
      primary={() => (

        <DataDisplay__SubReddit data={data} />

      )}
      breadcrumbs={[
        { name: 'Reddit Bot', href: '/reddit-bot', current: false },
        { name: 'Subs', href: '/reddit-bot/subs', current: false },
        { name: 'r/' + data.subreddit, href: `/reddit-bot/subs/${data.subreddit}`, current: true }
      ]}
    />
  )
}

export const getServerSideProps = async (context) => {
  const subreddit = get(context, 'params.subreddit', null);

  if (isEmpty(subreddit)) {
    return {
      props: {
        title: 'Subs',
        data: []
      }
    }
  }

  const response = await fetch(`https://www.reddit.com/r/${subreddit}/about.json`)
  const json = await response.json()

  const { data, error } = await supabase
    .from('subreddits')
    .update({
      lang: get(json, 'data.lang', null),
      created_utc: get(json, 'data.created_utc', null),
      advertiser_category: get(json, 'data.advertiser_category', null),
      public_description: get(json, 'data.public_description', null),
      description: get(json, 'data.description', null),
      display_name: get(json, 'data.display_name', null),
    })
    .eq('subreddit', subreddit)
    .select()

  if (error || isEmpty(data)) {
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
      title: subreddit,
      description: get(json, 'data.public_description', null),
      data: data[0]
    }
  }
}

export default SubRedditsPage;