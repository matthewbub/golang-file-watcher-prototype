import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../../supabase.config';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Retrieve the user data from the request body
    const { email, password } = req.body;

    const { data: userData, error } = await supabase.from('users').select('*').eq('email', email).single();

    console.log('userData, error', userData, error)
    if (error) {
      return res.status(500).json({ message: 'Something went wrong' });
    }

    if (!userData) {
      return res.status(404).json({ message: 'Account doesn\'t exist' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (passwordMatch) {
      // Generate a new JWT token
      const token = jwt.sign({ email: userData.email }, process.env.SUPABASE_JWT, { expiresIn: '1h' });

      // Return the token as the response
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
