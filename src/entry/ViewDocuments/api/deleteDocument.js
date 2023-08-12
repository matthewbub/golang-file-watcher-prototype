import { get } from 'lodash';
import { dayjs } from '../../../../../connections';

import { withAuthApiWrapper as withAuth } from '../../../../../helpers/withAuthApiWrapper';

export default withAuth('POST', 'console', async (req, res, userData) => {
  console.log('req.body', req.body);

  res.status(200).json({
    message: 'Received... Lazily.',
    data: {

    }
  });
});
