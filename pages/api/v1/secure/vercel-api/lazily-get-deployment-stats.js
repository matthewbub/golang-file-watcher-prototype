import { get } from 'lodash';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('en');
dayjs.extend(relativeTime);

import { withAuthApiWrapper as withAuth } from '@/helpers/withAuthApiWrapper';

export default withAuth('GET', 'console', async (req, res, userData) => {
  const vercelToken = process.env.NEXT_PUBLIC_VERCEL_TOKEN;
  const apiEndPt = 'https://api.vercel.com/v6/deployments?teamId=' + process.env.NEXT_PUBLIC_VERCEL_TEAM_ID;
  let config = {
    method: 'get',
    url: apiEndPt,
    headers: {
      Authorization: 'Bearer ' + vercelToken,
    },
  };
  let results = [];

  const loop = async (url) => {
    const unparsedDeployments = await fetch(url, config);
    const deployments = await unparsedDeployments.json();

    const deploymentsArray = get(deployments, 'deployments', []);
    const pagination = get(deployments, 'pagination', {});

    results = [...results, ...deploymentsArray];

    if (pagination.next) {
      const nextUrl = config.url + '&until=' + pagination.next;
      await loop(nextUrl);
    }

    return results;
  }

  const data = await loop(apiEndPt);

  // Collect number of deploys
  const deploys = data.length;

  // Collect Average Deploy Time
  const averageDeployTime = data.reduce((acc, curr) => {
    const { created, ready } = curr;
    const createdTime = dayjs(created);
    const readyTime = dayjs(ready);
    const diff = readyTime.diff(createdTime, 'second');
    return acc + diff;
  }, 0) / deploys;
  const averageDeployTimeFormatted = dayjs().startOf('day').add(averageDeployTime, 'second').format('mm:ss');

  // Collect number of failures
  const failures = data.filter((deploy) => deploy.state === 'ERROR').length;

  // Collect percentage of failures
  const failurePercentage = (failures / deploys) * 100;

  // Collect percentage of successful deploys
  const successfulDeploys = data.filter((deploy) => deploy.state === 'READY').length;
  const successfulDeploysPercentage = (successfulDeploys / deploys) * 100;

  res.status(200).json({
    message: 'Received... Lazily.',
    data: {
      stats: [
        {
          name: 'Deploy Count',
          value: deploys,
          percentage: null
        },
        {
          name: 'Average Deploy Time',
          value: averageDeployTimeFormatted,
          percentage: null
        },
        {
          name: 'Failed Deploys',
          value: failures,
          percentage: failurePercentage
        },
        {
          name: 'Successful Deploys',
          value: successfulDeploys,
          percentage: successfulDeploysPercentage
        },
      ],
      deployCount: deploys,
      averageDeployTime: averageDeployTimeFormatted,
      failureCount: failures,
      failurePercentage,
      successCount: successfulDeploys,
      successPercentage: successfulDeploysPercentage
    }
  });
});
