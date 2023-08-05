import { sspWithAuth } from '@/helpers';

export const getServerSideProps = sspWithAuth(async (context) => {
  const vercelToken = process.env.NEXT_PUBLIC_VERCEL_TOKEN;

  const apiEndPt = 'https://api.vercel.com/v5/domains?teamId=' + process.env.NEXT_PUBLIC_VERCEL_TEAM_ID;

  let config = {
    method: 'get',
    url: apiEndPt,
    headers: {
      Authorization: 'Bearer ' + vercelToken,
    },
  };

  const unparsedDomains = await fetch(config.url, config)

  const domains = await unparsedDomains.json();

  console.log('domains', domains)
  return {
    props: {
      title: 'Domains',
      domains
    }
  }
})