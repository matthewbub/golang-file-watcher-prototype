import { supabase } from '../../supabase.config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { commonApiMessages, regexPatterns } from '../../helpers/constants';
export const isStrongPassword = (password) => regexPatterns.password.test(password);

import { Logger } from '../../helpers';

const logger = new Logger('user_created:console');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, auth_type } = req.body;
    const confirmPassword = req.body['confirm-password'];

    // Start Basic Validations
    if (!email || !password) {
      logger.error({
        log_message: `User ${email || 'NO_EMAIL_PROVIDED'} failed to create from console`,
        data: { email, auth_type }
      });

      return res.status(400).json({
        data: null,
        error: {
          message: commonApiMessages.generalError
        }
      });
    }

    if (auth_type !== 'tenant' && auth_type !== 'iep' && auth_type !== 'console') {
      logger.error({
        log_message: `User ${email} failed to create from console`,
        data: 'Invalid auth_type'
      });

      return res.status(400).json({
        data: null,
        error: {
          message: commonApiMessages.generalError
        }
      });

    }

    if (!isStrongPassword(password)) {
      logger.error({
        log_message: `User ${email} failed to create from console`,
        data: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character'
      });

      return res.status(400).json({
        data: null,
        error: {
          message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character'
        }
      });
    }

    if (password !== confirmPassword) {
      logger.error({
        log_message: `User ${email} failed to create from console`,
        data: 'Passwords do not match'
      });

      return res.status(400).json({
        data: null,
        error: { message: 'Passwords do not match' }
      });
    }
    // End Basic Validations

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { error } = await supabase.from('users').insert([{
      email,
      password: hashedPassword,
      auth_type: auth_type
    }]);

    if (error) {
      logger.error({
        log_message: `User ${email} failed to create from console`,
        data: error
      });

      if (error.message.includes('duplicate key value violates unique constraint')) {
        return res.status(400).json({
          data: null,
          error: { message: 'User already exists' }
        });
      }

      return res.status(500).json({
        data: null,
        error: { message: commonApiMessages.generalError }
      });
    }

    logger.success({
      log_message: `User ${email} created from console as ${auth_type}`,
      data: auth_type
    });

    const token = jwt.sign({ email }, process.env.SUPABASE_JWT, { expiresIn: '1h' });
    res.status(200).json({
      data: token,
      error: null
    });

  } else {
    res.status(405).json({
      data: null,
      error: { message: commonApiMessages.generalError }
    });
  }
}
