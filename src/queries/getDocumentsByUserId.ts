import { supabase } from "../connections";

export const getDocumentsByUserId = async (id: string, { limit, order }: {
  limit: number;
  order: "created_at,asc" | "created_at,desc" | "updated_at,asc" | "updated_at,desc";
}) => {
  const safeLimit = limit || 10;
  const safeOrder = order || "created_at,desc";

  const [orderType, orderDateType] = safeOrder.split(",");
  const { data, error } = await supabase
    .from("documents")
    .select("*", { count: 'exact' })
    .eq("owner_id", id)
    .order(orderType, { ascending: orderDateType === "asc" })
    .limit(safeLimit);

  if (error) throw error;
  return data;
};