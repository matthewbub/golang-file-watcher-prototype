import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../supabase.config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await supabase
    .from('logs')
    .insert([
      { name: 'Hello World', data: req }
    ]).select();

  res.status(200).json({
    message: 'Hello World',
    tenant: req,
    data,
    error
  });
}