import { get } from 'lodash';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('en');
dayjs.extend(relativeTime);

export const getServerSideProps = async () => {
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

  // collect all authors
  const authors = deployments.deployments.map(deployment => deployment.creator.githubLogin)

  // remove duplicates
  const uniqueAuthors = [...new Set(authors)]

  const authorDetails = await Promise.all(uniqueAuthors.map(async author => {
    const authorConfig = {
      method: 'get',
      url: `https://api.github.com/users/${author}`
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

  const formattedDeployments = deployments.deployments.reduce((acc, deployment) => {
    let duration;

    const buildingAt = get(deployment, 'buildingAt', null);
    const ready = get(deployment, 'ready', null);

    if (buildingAt && ready) {
      duration = dayjs(ready).diff(dayjs(buildingAt), 's');
    } else {
      duration = '-'
    }
    const status = (
      deployment.state === 'READY' ? 'Completed' : deployment.state === 'ERROR' ? 'Error' : 'Running'
    )

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
        buildingAt,
        ready,
        duration,
        status,
        state: deployment.state,
        commit: deployment.meta.githubCommitSha.slice(0, 7),
        commitUrl: 'https://github.com/' + deployment.meta.githubOrg + '/' + deployment.meta.githubRepo + '/commit/' + deployment.meta.githubCommitSha,
        target: deployment.target,
        inspectorUrl: deployment.inspectorUrl,
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
