import { supabase } from '../../supabase.config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Retrieve the user data from the request body
    const { email, password } = req.body;

    // Perform password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a JWT token
    const token = jwt.sign({ email }, process.env.SUPABASE_JWT, { expiresIn: '1h' });

    // You can save the user data in a database here

    // Return the token as the response
    res.status(200).json({ token });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
