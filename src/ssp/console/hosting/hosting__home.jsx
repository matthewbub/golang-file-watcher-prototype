import { sspWithAuth } from '../../helpers';

export const getServerSideProps = sspWithAuth(async (context) => {
  return {
    props: {
      primaryTitle: 'Hosting',
      secondaryTitle: 'Recent deployments'
    }
  }
})
