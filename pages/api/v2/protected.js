import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (!req.headers.authorization) {
      res.status(403).json({ message: 'Authorization header must be provided' });
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      jwt.verify(token, 'your-secret-key');
      res.status(200).json({ message: 'You have accessed a protected API endpoint' });
    } catch (err) {
      res.status(403).json({ message: 'Invalid token' });
    }
  } else {
    res.status(405).json({ message: 'Only GET requests are accepted' });
  }
}
