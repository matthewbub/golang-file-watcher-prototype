import { supabase } from '../../../../supabase.config';
import { withAuthApiWrapper as withAuth } from '../../../../helpers/withAuthApiWrapper';

export default withAuth('POST', 'console', async (req, res, userData) => {
  const data = JSON.parse(req.body);
  console.log('data', data);

  // Update document
  const { data: documentData, error: documentError } = await supabase.from('documents').update({
    document_json: data.document_json,
    document_html: data.document_html,
    updated_at: new Date(),
  }).eq('id', data.id).select();


  if (documentError) {
    console.log('documentError', documentError);
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!documentData) {
    console.log('no documentData');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  console.log('documentData', documentData);

  res.status(200).json({ message: 'Authenticated request', redirectId: documentData[0].id });
});