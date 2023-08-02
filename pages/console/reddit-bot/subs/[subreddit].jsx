import { ConsoleLayout } from '@/components/ConsoleLayout';
import DataDisplay__SubReddit from '../../../../components/__BaseComponents/DataDisplay__SubReddit';

const SubRedditsPage = ({ title, description, data }) => {
  return (
    <ConsoleLayout
      primaryTitle={title}
      primaryTitleDescription={description}
      primary={() => <DataDisplay__SubReddit data={data} />}
      breadcrumbs={[
        { name: 'Reddit Bot', href: '/reddit-bot', current: false },
        { name: 'Subs', href: '/reddit-bot/subs', current: false },
        { name: 'r/' + data.subreddit, href: `/reddit-bot/subs/${data.subreddit}`, current: true }
      ]}
    />
  )
}

export { getServerSideProps } from '../../../../ssp/console/reddit-bot/reddit-bot__subs__subreddit';
export default SubRedditsPage;