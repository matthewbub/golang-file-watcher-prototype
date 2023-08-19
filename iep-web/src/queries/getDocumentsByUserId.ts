import { supabase } from "../connections";
import { CommonResponse } from '../helpers';

const response = new CommonResponse({
  data: { documents: [] },
});

export const getDocumentsByUserId = async (id: string, { limit, order }: {
  limit: number;
  order: "created_at,asc" | "created_at,desc" | "updated_at,asc" | "updated_at,desc";
}) => {
  const safeLimit = limit || 10;
  const safeOrder = order || "created_at,desc";

  const [orderType, orderDateType] = safeOrder.split(",");
  const { data, error } = await supabase
    .from("documents")
    .select("*, category (*)", { count: 'exact' })
    .eq("owner_id", id)
    .order(orderType, { ascending: orderDateType === "asc" })
    .limit(safeLimit);

    // console.log('INFO',data);
  if (error) {
    return response.sendError({
      isSuccessful: false,
      message: error.message,
      code: 'SUPABASE_DOCUMENT_GET_BY_ID_ERROR'
    });
  }

  return response.send({
    documents: data || []
  });
};