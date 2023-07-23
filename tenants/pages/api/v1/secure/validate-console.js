import jwt from 'jsonwebtoken';
import { supabase } from '../../../../supabase.config';

const unauthorized = {
  ok: false,
  message: 'Unauthorized',
  email: null
}
export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Verify the JWT token from the HttpOnly cookie
      const token = req.cookies.accessToken;

      if (!token) {
        return res.status(401).json(unauthorized);
      }

      const decodedToken = jwt.verify(token, process.env.SUPABASE_JWT);

      // If the token is valid, proceed with handling the request
      // Otherwise, return an error response
      // Your code to handle the authenticated request goes here
      if (!decodedToken) {
        return res.status(401).json(unauthorized);
      }

      if (!decodedToken.email) {
        return res.status(401).json(unauthorized);
      }

      const { data: userData, error } = await supabase.from('users').select('*').eq('email', decodedToken.email).single();

      if (error) {
        return res.status(401).json(unauthorized);
      }

      if (!userData) {
        return res.status(401).json(unauthorized);
      }

      if (userData?.auth_type !== 'console') {
        return res.status(401).json(unauthorized);
      }

      res.status(200).json({ ok: true, message: 'Authenticated request', email: decodedToken.email });
    } catch (error) {
      res.status(401).json(unauthorized);
    }

  } else {
    res.status(405).json(unauthorized);
  }
}