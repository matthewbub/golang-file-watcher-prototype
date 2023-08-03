import { withAuthApiWrapper as withAuth } from '@/helpers/withAuthApiWrapper';

export default withAuth('GET', 'console', async (req, res, userData) => {
  // const { data: documentData, error: documentError } = await supabase.from('documents').insert([
  //   {
  //     document_creator: userData.id,
  //   },
  // ]).select();

  // if (documentError || !documentData) {
  //   console.log('documentError', documentError);
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }

  // console.log('documentData', documentData);
  res.status(200).json({ message: 'Authenticated request... Lazily.' });
});
