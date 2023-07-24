import { supabase } from '../../../supabase.config';

export const getServerSideProps = async (context) => {
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
}
