import { get } from 'lodash';
import { supabase } from "../connections";
import { CommonResponse } from '../helpers';

const response = new CommonResponse({
  data: { count: 0 },
});

export const getDocumentCountByUserId = async (email: string) => {
  const { data, error } = await supabase
    .from('users')
    .select(`email, id, documents (count)`)
    .eq('email', email)
    .single();

  if (error) {
    return response.sendError({
      isSuccessful: false,
      message: error.message,
      code: 'SUPABASE_DOCUMENT_COUNT_ERROR'
    });
  }

  return response.send({
    count: get(data, 'documents[0].count', 0)
  });
};