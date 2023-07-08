import { supabase } from '../../config/supabaseConfig';

export const signUpUser = async (user) => {
  if (!user) {
    return { error: 'User is required' };
  }

  if (!user.email) {
    return { error: 'Email is required' };
  }

  if (!user.password) {
    return { error: 'Password is required' };
  }

  if (!user.user_id) {
    return { error: 'User ID is required' };
  }

  const { error } = await supabase
    .from('users')
    .insert([
      {
        email: user.email,
        password: user.password,
        user_id: user.user_id
      },
    ])

  if (error) {
    return { error };
  }

  return {
    data: {
      email: user.email,
      user_id: user.user_id
    }
  };
}
