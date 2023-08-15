import { withAuthApiWrapper as withAuth } from '../../../helpers/withAuthApiWrapper';

export default withAuth('POST', 'console', async (req, res, userData) => {
  console.log('req.body', req.body);

  // Captures page title, page description, and primary image for the page

  //   page_title
  // description
  // image
  res.status(200).json({
    message: 'Received... Lazily.',
    data: {

    }
  });
});
