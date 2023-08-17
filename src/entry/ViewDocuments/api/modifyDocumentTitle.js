import { withAuthApiWrapper as withAuth } from '../../../helpers/withAuthApiWrapper';

export default withAuth('POST', 'console', async (req, res, userData) => {
  // captures the h1 page title, slug and 
  // slug
  // category
  // title

  console.log('req.body', req.body);

  res.status(200).json({
    message: 'Received... Lazily.',
    data: {

    }
  });
});
