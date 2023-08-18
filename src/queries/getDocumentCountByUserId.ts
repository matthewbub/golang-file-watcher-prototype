import { get } from 'lodash';
import { supabase } from "../connections";
import { CommonResponse } from '../helpers';

const response = new CommonResponse({
  data: { count: 0 },
});

export const getDocumentCountByUserId = async (id: string) => {
  const { data, error } = await supabase
    .from('documents')
    .select('*', { count: 'exact', head: true })
    // .range(0, 1)
    // .eq('owner_id', id);

    console.log('data::', data);
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