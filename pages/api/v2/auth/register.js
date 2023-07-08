import bcrypt from 'bcryptjs';

// This should be replaced by a database
let users = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = {
      id: Date.now(),
      username: req.body.username,
      password: hashedPassword,
    };
    users.push(user);
    res.status(201).json({ message: 'User registered successfully' });
  } else {
    res.status(405).json({ message: 'Only POST requests are accepted' });
  }
}