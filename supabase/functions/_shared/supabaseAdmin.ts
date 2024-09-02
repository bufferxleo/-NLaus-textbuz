import 'jsr:@std/dotenv/load';

import { createClient } from 'npm:@supabase/supabase-js';


export const supabaseAdmin = createClient(
	Deno.env.get('SB_SUPABASE_LOCAL_URL')!,
	Deno.env.get('SB_SUPABASE_SERVICE_LOCAL_KEY')!,
	Deno.env.get('SB_SUPABASE_LOCAL_JWT_SECRET')!,
);
