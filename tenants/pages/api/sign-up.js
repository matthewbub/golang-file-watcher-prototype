import { supabase } from '../../supabase.config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const { error } = await supabase.from('users').insert([{ email, password: hashedPassword }]);

    if (error) {
      if (error.message.includes('duplicate key value violates unique constraint')) {
        return res.status(400).json({
          data: null,
          error: {
            message: 'User already exists'
          }
        });
      }

      return res.status(500).json({
        data: null,
        error: {
          message: 'Something went wrong'
        }
      });
    }

    const token = jwt.sign({ email }, process.env.SUPABASE_JWT, { expiresIn: '1h' });
    res.status(200).json({
      data: token,
      error: null
    });
  } else {
    res.status(405).json({
      data: null,
      error: {
        message: 'Something went wrong'
      }
    });
  }
}
