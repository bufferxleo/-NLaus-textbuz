import 'jsr:@std/dotenv/load';

import { createClient } from 'npm:@supabase/supabase-js';

export const supabaseClient = createClient(
	Deno.env.get('SB_SUPABASE_URL')!,
	Deno.env.get('SB_SUPABASE_KEY')!,
);
