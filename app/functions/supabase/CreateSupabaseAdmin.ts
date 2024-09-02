import { createClient } from "@supabase/supabase-js";

//SUPABASE LOCAL
const supabaseUrl = process.env.SUPABASE_LOCAL_URL ?? ``;
const supabaseAnonKey = process.env.SUPABASE_LOCAL_KEY ?? ``;

export const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey);
