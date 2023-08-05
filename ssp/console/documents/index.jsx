import { supabase } from '../../../supabase.config';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('en');
dayjs.extend(relativeTime);
import { sspWithAuth } from '@/helpers/sspWithAuth';
import { get } from 'lodash';

export const getServerSideProps = sspWithAuth(async (context) => {
  const token = get(context, 'req.cookies.accessToken', null);
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

  const formattedData = data.documents.reduce((acc, doc) => ([
    ...acc,
    {
      ...doc,
      created_at: dayjs(doc.created_at).format('MM/DD/YYYY HH:mm:ss A'),
      document_owner: data.email,
    }
  ]), []);

  if (error) {
    console.error(error);

  } else {
    console.log('data', data);
  }

  return {
    props: {
      primaryTitle: 'Documents',
      data: formattedData,
    }
  }
});
