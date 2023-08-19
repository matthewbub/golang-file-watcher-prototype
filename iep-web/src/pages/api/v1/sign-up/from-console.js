import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../../../../connections';
import { commonApiMessages, regexPatterns } from '../../../../helpers/constants';

export const isStrongPassword = (password) => regexPatterns.password.test(password);

import { Logger, passwordValidation } from '../../../../helpers';

const logger = new Logger('user_created:console');

const authTypes = [
  'tenant',
  'iep',
  'console'
];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, authType, phone, confirmPassword } = req.body; 

    console.log('req.body', req.body);
    // Start Basic Validations
    if (!email || !password) {
      logger.error({ log_message: `User ${email || 'NO_EMAIL_PROVIDED'} failed to create from console`, data: { email, authType }});

      return res.status(400).json({ data: null, error: { message: commonApiMessages.generalError } });
    }

    if (!authTypes.includes(authType)) {
      logger.error({ log_message: `User ${email} failed to create from console`, data: 'Invalid authType' });

      return res.status(400).json({ data: null, error: { message: commonApiMessages.generalError } });
    }

    const isValidPassword = passwordValidation(password);
    if (typeof isValidPassword === 'string') {
      logger.error({ log_message: `User ${email} failed to create from console`, data: isValidPassword });

      return res.status(400).json({ data: null, error: { message: isValidPassword }});
    }

    if (password !== confirmPassword) {
      logger.error({ log_message: `User ${email} failed to create from console`, data: 'Passwords do not match' });

      return res.status(400).json({ data: null, error: { message: 'Passwords do not match' } });
    }
    // End Basic Validations

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { error } = await supabase.from('users').insert([{
      email,
      password: hashedPassword,
      auth_type: authType,
      phone: phone || null, // TODO Validate phone number
    }]);

    if (error) {
      logger.error({log_message: `User ${email} failed to create from console`, data: error});

      if (error.message.includes('duplicate key value violates unique constraint')) {
        return res.status(400).json({data: null, error: { message: 'User already exists' }});
      }
      
      console.log('error', error);
      return res.status(500).json({ data: null, error: { message: commonApiMessages.generalError } });
    }
    
    logger.success({ log_message: `User ${email} created from console as ${authType}`, data: authType });
    
    // TODO: Validate phone number
    // TODO: Send email to user with link to verify email address
    // TODO: Send email to admin with link to verify user
    // TODO: Set expires in value from database
    const token = jwt.sign({ email }, process.env.SUPABASE_JWT, { expiresIn: '1h' });
    
    res.status(200).json({ data: token, error: null });
  } else {
    res.status(405).json({ data: null, error: { message: commonApiMessages.generalError } });
  }
}
