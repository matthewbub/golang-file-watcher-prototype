import { get } from 'lodash';
import { supabase } from "../connections";
import { CommonResponse } from '../helpers';

const response = new CommonResponse({
  data: { user: {} },
});

export const getUserByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    return response.sendError({
      isSuccessful: false,
      message: error.message,
      code: 'SUPABASE_USER_GET_BY_EMAIL_ERROR'
    });
  }

  return response.send({
    user: data || {}
  });
};