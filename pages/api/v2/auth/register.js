import bcrypt from 'bcryptjs';
import { supabase } from '../../../../config/supabaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { signUpUser } from '../../../../utils/queries/signUpUser';
import e from 'cors';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const userId = uuidv4();
    const user = {
      id: Date.now(),
      email: req.body.email,
      password: hashedPassword,
      user_id: userId
    };

    const { error, data } = await signUpUser(user);

    if (error) {
      console.log(error)
      res.status(401).json({ error: { message: 'Invalid username or password' } });
      return;
    }

    console.log('error', error)

    res.status(201).json({
      message: 'User registered successfully',
      data: {
        email: data.email,
        user_id: data.user_id
      }
    });
  } else {
    res.status(405).json({ error: { message: 'Invalid username or password' } });
  }
}