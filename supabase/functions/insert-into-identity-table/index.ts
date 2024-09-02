import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { pgTable, uuid, varchar, timestamp, integer } from 'drizzle-orm/pg-core';
import { eq, or } from 'drizzle-orm';

// Connection string for the Postgres database
const connectionString = Deno.env.get('SUPABASE_DB_URL')!;

// Define the Identity table schema
export const identity = pgTable('identity', {
    identityId: uuid('identity_id').default('gen_random_uuid()').primaryKey(),
    phoneNumber: varchar('phone_number', { length: 15 }).notNull().unique(),
    email: varchar('email', { length: 50 }).notNull().unique(),
    createdAt: timestamp('created_at').default('CURRENT_TIMESTAMP'),
    loginCount: integer('login_count'),
});

Deno.serve(async (req: Request) => {
  if (req.method === 'POST') {
    try {
      // Parse the request body
      const requestBody = await req.json();
      console.log(requestBody);

      // Initialize the Postgres client and Drizzle ORM
      const client = postgres(connectionString, { prepare: false });
      const db = drizzle(client);

      // Check if the phone number or email already exists
      const existingIdentity = await db
        .select()
        .from(identity)
        .where(
          eq(identity.phoneNumber, requestBody.phoneNumber)
        );

      if (existingIdentity.length > 0) {
        // If phone number matches, update the login count
        if (existingIdentity[0].phoneNumber === requestBody.phoneNumber) {
          await db
            .update(identity)
            .set({ loginCount: existingIdentity[0].loginCount + 1 })
            .where(eq(identity.phoneNumber, requestBody.phoneNumber));

          return new Response(
            JSON.stringify({ success: true, message: 'Identity exists, Login count updated successfully' }),
            {
              headers: { 'Content-Type': 'application/json' },
              status: 200,
            }
          );
        }

        // If email matches, return a conflict response
        return new Response(
          JSON.stringify({ success: false, message: 'Email already exists' }),
          {
            headers: { 'Content-Type': 'application/json' },
            status: 409,
          }
        );
      }
      // Insert the new identity
      await db.insert(identity).values({
        phoneNumber: requestBody.phoneNumber,
        email: requestBody.email,
        loginCount: requestBody.loginCount ?? 1,
      });
      // Return a success response
      return new Response(
        JSON.stringify({ success: true, message: 'Identity created successfully' }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 201,
        }
      );
    } catch (error) {
      // Handle any errors that occurred during the insertion
      return new Response(
        JSON.stringify({ success: false, message: error.message }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }
  } else {
    return new Response(
      JSON.stringify({ success: false, message: 'Only POST requests are allowed' }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 405,
      }
    );
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/insert-into-identity-table' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"phoneNumber":"1234567890", "email":"test@example.com", "loginCount":5}'
*/
