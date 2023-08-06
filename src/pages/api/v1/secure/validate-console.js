import jwt from 'jsonwebtoken';
import { supabase } from '../../../../supabase.config';
import { getSessionExpiryMessage } from '../../../../helpers';

const unauthorized = {
  ok: false,
  message: 'Unauthorized',
  email: null
}

const logIfDev = (message, error) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, error || '');
  }
}

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Verify the JWT token from the HttpOnly cookie
      const token = req.cookies.accessToken;

      if (!token) {
        logIfDev('No token');
        return res.status(401).json(unauthorized);
      }

      const decodedToken = jwt.verify(token, process.env.SUPABASE_JWT);

      // If the token is valid, proceed with handling the request
      // Otherwise, return an error response
      // Your code to handle the authenticated request goes here
      if (!decodedToken) {
        logIfDev('No decodedToken');
        return res.status(401).json(unauthorized);
      }

      if (!decodedToken.email) {
        logIfDev('No decodedToken.email');
        return res.status(401).json(unauthorized);
      }

      const { data: userData, error } = await supabase.from('users').select('*').eq('email', decodedToken.email).single();

      if (error) {
        logIfDev('Error fetching user data');
        return res.status(401).json(unauthorized);
      }

      if (!userData) {
        logIfDev('No user data');
        return res.status(401).json(unauthorized);
      }

      if (userData?.auth_type !== 'console') {
        logIfDev('User is not a console user');
        return res.status(401).json(unauthorized);
      }

      const expiryMessage = getSessionExpiryMessage(decodedToken);

      res.status(200).json({
        ok: true,
        message: 'Authenticated request',
        email: decodedToken.email,
        expires: expiryMessage
      });
    } catch (error) {
      logIfDev('Error validating token', error);
      res.status(401).json(unauthorized);
    }

  } else {
    logIfDev('Method not allowed');
    res.status(405).json(unauthorized);
  }
}