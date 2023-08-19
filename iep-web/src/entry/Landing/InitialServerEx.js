import { sspWithAuth } from '../../../helpers/sspWithAuth';

export const getServerSideProps = sspWithAuth(async (context) => {
  return {
    props: {}
  }
});
