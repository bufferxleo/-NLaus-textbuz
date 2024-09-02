import { createClient } from "@supabase/supabase-js";

// SUPABASE ONLINE
const supabaseUrl = process.env.SUPABASE_URL ?? ``;
const supabaseAnonKey = process.env.SUPABASE_KEY ?? ``;

//SUPABASE LOCAL
// const supabaseUrl = process.env.SUPABASE_LOCAL_URL ?? ``;
// const supabaseAnonKey = process.env.SUPABASE_LOCAL_KEY ?? ``;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
