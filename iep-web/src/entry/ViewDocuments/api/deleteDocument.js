

import { withAuthApiWrapper as withAuth } from '../../../helpers/withAuthApiWrapper';

export default withAuth('POST', 'console', async (req, res, userData) => {
  console.log('req.body', req.body);
  // We need the document id
  // the user id

  // documentId
  // userId
  res.status(200).json({
    message: 'Received... Lazily.'
  });
});
