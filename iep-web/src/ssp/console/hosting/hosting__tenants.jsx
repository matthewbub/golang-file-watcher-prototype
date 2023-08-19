import { supabase } from '../../../connections';
import { sspWithAuth } from '../../../helpers';

export const getServerSideProps = sspWithAuth(async (context) => {
  const { data, error } = await supabase.from('tenants').select('*');

  if (error) {
    console.log(error);
  }

  return {
    props: {
      title: 'Tenants',
      tenants: data
    }
  }
})
