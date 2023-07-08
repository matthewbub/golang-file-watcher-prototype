import bcrypt from 'bcryptjs';
import { supabase } from '../../../../config/supabaseConfig';
import { v4 as uuidv4 } from 'uuid';

// This should be replaced by a database
let users = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = {
      id: Date.now(),
      username: req.body.username,
      password: hashedPassword,
      user_id: uuidv4()
    };

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          username: user.username,
          password: user.password,
          user_id: user.user_id
        },
      ])

    if (error) {
      console.log(error)
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    users.push(user);
    res.status(201).json({ message: 'User registered successfully' });
  } else {
    res.status(405).json({ message: 'Only POST requests are accepted' });
  }
}