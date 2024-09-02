

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."TB" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "phone_number" "text" NOT NULL,
    "first_name" "text",
    "last_name" "text",
    "email" "text",
    "profile_picture" "text",
    "profile_picture_url" "text",
    "identity_id" "text" NOT NULL
);


ALTER TABLE "public"."TB" OWNER TO "postgres";


ALTER TABLE "public"."TB" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."TB_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."activity_type" (
    "type_id" integer NOT NULL,
    "type_name" character varying(50) NOT NULL
);


ALTER TABLE "public"."activity_type" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."activity_type_type_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."activity_type_type_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."activity_type_type_id_seq" OWNED BY "public"."activity_type"."type_id";



CREATE TABLE IF NOT EXISTS "public"."customer" (
    "customer_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "first_name" character varying(50) NOT NULL,
    "last_name" character varying(50) NOT NULL,
    "phone_number" character varying(15),
    "email" character varying(50),
    "profile_picture_url" character varying(255),
    "identity_id" "uuid",
    "last_login" timestamp without time zone,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."customer" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."customer_activity" (
    "activity_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "customer_id" "uuid",
    "activity_type_id" integer,
    "activity_timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."customer_activity" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."identity" (
    "identity_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "phone_number" character varying(15) NOT NULL,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."identity" OWNER TO "postgres";


ALTER TABLE ONLY "public"."activity_type" ALTER COLUMN "type_id" SET DEFAULT "nextval"('"public"."activity_type_type_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."activity_type"
    ADD CONSTRAINT "activity_type_pkey" PRIMARY KEY ("type_id");



ALTER TABLE ONLY "public"."activity_type"
    ADD CONSTRAINT "activity_type_type_name_key" UNIQUE ("type_name");



ALTER TABLE ONLY "public"."customer_activity"
    ADD CONSTRAINT "customer_activity_pkey" PRIMARY KEY ("activity_id");



ALTER TABLE ONLY "public"."customer"
    ADD CONSTRAINT "customer_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."customer"
    ADD CONSTRAINT "customer_phone_number_key" UNIQUE ("phone_number");



ALTER TABLE ONLY "public"."customer"
    ADD CONSTRAINT "customer_pkey" PRIMARY KEY ("customer_id");



ALTER TABLE ONLY "public"."identity"
    ADD CONSTRAINT "identity_phone_number_key" UNIQUE ("phone_number");



ALTER TABLE ONLY "public"."identity"
    ADD CONSTRAINT "identity_pkey" PRIMARY KEY ("identity_id");



ALTER TABLE ONLY "public"."TB"
    ADD CONSTRAINT "tb_identity_id_key" UNIQUE ("identity_id");



ALTER TABLE ONLY "public"."TB"
    ADD CONSTRAINT "tb_pkey" PRIMARY KEY ("id", "phone_number");



ALTER TABLE ONLY "public"."customer_activity"
    ADD CONSTRAINT "customer_activity_activity_type_id_fkey" FOREIGN KEY ("activity_type_id") REFERENCES "public"."activity_type"("type_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."customer_activity"
    ADD CONSTRAINT "customer_activity_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("customer_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."customer"
    ADD CONSTRAINT "customer_identity_id_fkey" FOREIGN KEY ("identity_id") REFERENCES "public"."identity"("identity_id");





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";









































































































































































































GRANT ALL ON TABLE "public"."TB" TO "anon";
GRANT ALL ON TABLE "public"."TB" TO "authenticated";
GRANT ALL ON TABLE "public"."TB" TO "service_role";



GRANT ALL ON SEQUENCE "public"."TB_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."TB_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."TB_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."activity_type" TO "anon";
GRANT ALL ON TABLE "public"."activity_type" TO "authenticated";
GRANT ALL ON TABLE "public"."activity_type" TO "service_role";



GRANT ALL ON SEQUENCE "public"."activity_type_type_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."activity_type_type_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."activity_type_type_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."customer" TO "anon";
GRANT ALL ON TABLE "public"."customer" TO "authenticated";
GRANT ALL ON TABLE "public"."customer" TO "service_role";



GRANT ALL ON TABLE "public"."customer_activity" TO "anon";
GRANT ALL ON TABLE "public"."customer_activity" TO "authenticated";
GRANT ALL ON TABLE "public"."customer_activity" TO "service_role";



GRANT ALL ON TABLE "public"."identity" TO "anon";
GRANT ALL ON TABLE "public"."identity" TO "authenticated";
GRANT ALL ON TABLE "public"."identity" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
