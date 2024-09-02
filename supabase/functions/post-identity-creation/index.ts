import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm/expressions";

// Connection string for the Postgres database
const connectionString = Deno.env.get('SUPABASE_DB_URL')!;

// Define the Customer table schema
export const customer = pgTable('customer', {
    customerId: uuid('customer_id').default('gen_random_uuid()').primaryKey(),
    firstName: varchar('first_name', { length: 50 }).notNull(),
    lastName: varchar('last_name', { length: 50 }).notNull(),
    phoneNumber: varchar('phone_number', { length: 15 }).notNull().unique(),
    email: varchar('email', { length: 50 }).notNull().unique(),
    profilePictureUrl: varchar('profile_picture_url', { length: 255 }),
    identityId: uuid('identity_id').notNull(),
    lastLogin: timestamp('last_login'),
    updatedAt: timestamp('updated_at').default('CURRENT_TIMESTAMP').notNull(),
    createdAt: timestamp('created_at').default('CURRENT_TIMESTAMP').notNull(),
});

Deno.serve(async (req: Request) => {
  if (req.method === 'POST') {
    const identityData = await req.json();
    
    // Initialize the Postgres client and Drizzle ORM
    const client = postgres(connectionString, { prepare: false });
    const db = drizzle(client);

    // Check if customer exists
    const existingCustomer = await db
      .select()
      .from(customer)
      .where(eq(customer.identityId, identityData.identityId));

    if (existingCustomer.length > 0) {
      // Update existing customer record
      await db
        .update(customer)
        .set({
          phoneNumber: identityData.phoneNumber,
          email: identityData.email,
          updatedAt: new Date(),
        })
        .where(eq(customer.identityId, identityData.identityId));
    } else {
      // Create a new customer record
      await db.insert(customer).values({
        identityId: identityData.identityId,
        phoneNumber: identityData.phoneNumber,
        email: identityData.email,
        firstName: identityData.firstName,
        lastName: identityData.lastName,
        profilePictureUrl: identityData.profilePictureUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ success: false }), { status: 405 });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/post-identity-creation' \
    --header 'Authorization: Bearer YOUR_SUPABASE_JWT' \
    --header 'Content-Type: application/json' \
    --data '{"identityId":"IDENTITY_ID", "phoneNumber":"1234567890", "email":"test@example.com", "firstName":"John", "lastName":"Doe", "profilePictureUrl":"http://example.com/profile.jpg"}'
*/
