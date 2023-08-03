import jwt from 'jsonwebtoken';
import { supabase } from '@/supabase.config';
import { Logger } from '@/helpers';
import { commonApiMessages } from '@/helpers/constants';

const logger = new Logger('user_validation');

export const withAuthApiWrapper = (method, authType, customCode) => async (req, res) => {
  if (req.method === method) {
    try {
      const token = req.cookies.accessToken;
      if (!token) {
        logger.error({
          log_message: `Failed to retrieve user token`,
          data: 'No token provided'
        });
        return res.status(401).json({ message: commonApiMessages.unauthorized });
      }

      const decodedToken = jwt.verify(token, process.env.SUPABASE_JWT);
      if (!decodedToken || !decodedToken.email) {
        logger.error({
          log_message: `Failed to decode user token`,
          data: 'Invalid token'
        });
        return res.status(401).json({ message: commonApiMessages.unauthorized });
      }

      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', decodedToken.email)
        .single();

      if (error || !userData || userData?.auth_type !== authType) {
        logger.error({
          log_message: `Failed to retrieve user data`,
          data: error || 'No user data'
        });

        return res.status(401).json({ message: commonApiMessages.unauthorized });
      }

      await customCode(req, res, userData);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.log(error);
      logger.error({
        log_message: `Failed at catch block in withAuthApiWrapper`,
        data: error
      });

      res.status(401).json({ message: commonApiMessages.unauthorized });
    }

  } else {
    res.status(405).json({ message: commonApiMessages.methodNotAllowed });
  }
}
