import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../supabase.config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await supabase
    .from('logs')
    .insert([
      { name: 'Hello World', data: req }
    ]).select();

  // console.log('req', req)

  res.status(200).json({
    message: 'Hello World',
    data,
    error
  });
}