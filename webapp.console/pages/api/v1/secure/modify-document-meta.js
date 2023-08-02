import jwt from 'jsonwebtoken';
import { supabase } from '../../../../supabase.config';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Verify the JWT token from the HttpOnly cookie
      const token = req.cookies.accessToken;
      console.log('token', token);
      if (!token) {
        console.log('no token');
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const decodedToken = jwt.verify(token, process.env.SUPABASE_JWT);

      // If the token is valid, proceed with handling the request
      // Otherwise, return an error response
      // Your code to handle the authenticated request goes here
      if (!decodedToken) {
        console.log('no decodedToken');
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (!decodedToken.email) {
        console.log('no decodedToken.email');
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { data: userData, error } = await supabase.from('users').select('*').eq('email', decodedToken.email).single();

      if (error) {
        console.log('error', error);
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (!userData) {
        console.log('no userData');
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (userData?.auth_type !== 'console') {
        console.log('userData?.auth_type !== console');
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // console.log('req.body', req.body)
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
    } catch (error) {
      console.log('error/v2', error);
      res.status(401).json({ message: 'Unauthorized' });
    }

  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}