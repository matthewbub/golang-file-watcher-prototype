import { supabase } from '../../../supabase.config';
import jwt from 'jsonwebtoken';

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.accessToken;
  const decodedToken = jwt.verify(token, process.env.SUPABASE_JWT);

  const { data: user, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('email', decodedToken.email)
    .single();

  if (userError) {
    console.error(userError);
  }

  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('document_creator', user.id);

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
