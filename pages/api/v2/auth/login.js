import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// This should be replaced by a database
const users = [
  {
    id: 1,
    username: 'user',
    password: bcrypt.hashSync('password', 10), // Hashed password
  },
  // More users...
];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username);
    if (!user) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    const passwordValid = bcrypt.compareSync(password, user.password);
    if (!passwordValid) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    const claims = { sub: user.id, username: user.username };
    const jwtToken = jwt.sign(claims, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ token: jwtToken });
  } else {
    res.status(405).json({ message: 'Only POST requests are accepted' });
  }
}
