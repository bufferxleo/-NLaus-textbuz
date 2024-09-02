import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = Deno.env.get('SUPABASE_DB_URL')!;


import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

// Define the Identity table schema
export const identity = pgTable('identity', {
    identityId: uuid('identity_id').default('gen_random_uuid()').primaryKey(),
    phoneNumber: varchar('phone_number', { length: 15 }).notNull().unique(),
    createdAt: timestamp('created_at').default('CURRENT_TIMESTAMP'),
});


Deno.serve(async (_req: any) => {
  const client = postgres(connectionString, { prepare: false });
  const db = drizzle(client);

  // Example query: select all identities
  const allIdentities = await db.select().from(identity);

  return Response.json(allIdentities);
});


/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/drizzle' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
