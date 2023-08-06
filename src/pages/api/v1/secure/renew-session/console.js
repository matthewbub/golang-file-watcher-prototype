import { get } from 'lodash';
import jwt from 'jsonwebtoken';
import { withAuthApiWrapper as withAuth } from '../../../../../helpers/withAuthApiWrapper';

export default withAuth('GET', 'console', async (req, res, userData) => {
  const token = get(req, 'cookies.accessToken', '');
  const payload = jwt.verify(token, process.env.SUPABASE_JWT);
  console.log('payload', payload)
  const newToken = jwt.sign({ email: payload.email }, process.env.SUPABASE_JWT, { expiresIn: '1h' });

  res.setHeader('Set-Cookie', `accessToken=${newToken}; HttpOnly; Path=/; Max-Age=${60 * 60}`);
  return res.status(200).json({
    ok: true,
    message: 'Session renewed successfully'
  });
});
