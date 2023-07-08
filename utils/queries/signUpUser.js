import { supabase } from '../../config/supabaseConfig';

export const signUpUser = async (user) => (
  await supabase
    .from('users')
    .insert([
      {
        email: user.email,
        password: user.password,
        user_id: user.user_id
      },
    ])
)