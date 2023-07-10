import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON
);


export const HEY_YOU____ONLY_USE_FOR_PERSISTENT_STORAGE____Supabase = createClient(
  process.env.TEMPPROD_SUPABASE_URL,
  process.env.TEMPPROD_SUPABASE_ANON
);
