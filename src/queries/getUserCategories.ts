import { supabase } from "../connections";
import { CommonResponse } from '../helpers';

const response = new CommonResponse({
  data: { categories: [] },
});

export const getUserCategories = async (email: string) => {
  const { data, error } = await supabase
    .from('users')
    .select(`document_categories (*)`)
    .eq('email', email);

  if (error) {
    return response.sendError({
      isSuccessful: false,
      message: error.message,
      code: 'SUPABASE_USER_GET_BY_CATEGORY_ERROR'
    });
  }

  return response.send({
    categories: data || {}
  });
};