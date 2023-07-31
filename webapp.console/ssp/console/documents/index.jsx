import { supabase } from '../../../supabase.config';
import jwt from 'jsonwebtoken';

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.accessToken;
  const decodedToken = jwt.verify(token, process.env.SUPABASE_JWT);

  const { data, error } = await supabase
    .from('users')
    .select(`
      email,
      documents (
          *
      )
  `)
    .eq('email', decodedToken.email)
    .single();

  if (error) {
    console.error(error);

  } else {
    console.log('data', data);
  }

  return {
    props: {
      primaryTitle: 'Documents',
      data: data,
    }
  }
}
