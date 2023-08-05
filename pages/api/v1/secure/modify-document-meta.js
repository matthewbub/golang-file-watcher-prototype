import { get } from 'lodash';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';

import { supabase } from '@/supabase.config';

dayjs.locale('en');
dayjs.extend(relativeTime);

import { withAuthApiWrapper as withAuth } from '@/helpers/withAuthApiWrapper';

export default withAuth('POST', 'console', async (req, res, userData) => {
  console.log('req.body', req.body, 'userData', userData);

  const {
    id,
    document_title,
    document_description,
    page_title,
    screen,
    visibility,
  } = req.body;


  res.status(200).json({
    message: 'Received... Lazily.',
    data: {}
  });
});
