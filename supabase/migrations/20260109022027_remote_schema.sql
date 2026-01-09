


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


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."child_updates" (
    "date_time" timestamp with time zone DEFAULT "now"() NOT NULL,
    "child_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "update" "text" NOT NULL
);


ALTER TABLE "public"."child_updates" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."children" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "full_name" character varying NOT NULL,
    "guardian_id" "uuid",
    "date_of_birth" "date",
    "location" character varying,
    "school_grade" smallint,
    "field_officer_id" "uuid" DEFAULT "gen_random_uuid"(),
    "gender" character varying,
    "yearly_expenses" integer,
    "notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "active" boolean DEFAULT true,
    "photo_path" character varying,
    "dream_job" character varying,
    "favorite_activity" character varying
);


ALTER TABLE "public"."children" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."communications" (
    "sponsor_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "child_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "status" character varying
);


ALTER TABLE "public"."communications" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."consent_records" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "subject_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "subject_full_name" character varying NOT NULL,
    "subject_email" character varying NOT NULL,
    "consent_version_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "agreed_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "ip_address" character varying,
    "consent_type" character varying,
    "subject_phone_number" character varying,
    "status" character varying NOT NULL,
    "withdrawn_at" timestamp with time zone
);


ALTER TABLE "public"."consent_records" OWNER TO "postgres";


COMMENT ON COLUMN "public"."consent_records"."subject_id" IS 'user id for users or guardian id for guardians';



COMMENT ON COLUMN "public"."consent_records"."consent_type" IS 'user_terms or child_guardian';



COMMENT ON COLUMN "public"."consent_records"."status" IS 'active vs withdrawn';



COMMENT ON COLUMN "public"."consent_records"."withdrawn_at" IS 'date and time of withdrawal if applicable';



CREATE TABLE IF NOT EXISTS "public"."consent_versions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "text" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "consent_type" character varying
);


ALTER TABLE "public"."consent_versions" OWNER TO "postgres";


COMMENT ON COLUMN "public"."consent_versions"."consent_type" IS 'child_guardian or user_terms';



CREATE TABLE IF NOT EXISTS "public"."donations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "date_time" timestamp with time zone DEFAULT "now"() NOT NULL,
    "amount" integer DEFAULT 0 NOT NULL,
    "child_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "sponsor_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "payment_method_id" integer
);


ALTER TABLE "public"."donations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."field_officers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "full_name" character varying NOT NULL,
    "phone_number" character varying,
    "email_address" character varying,
    "notes" "text"
);


ALTER TABLE "public"."field_officers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."guardians" (
    "full_name" character varying NOT NULL,
    "phone_number" character varying,
    "id" "uuid" NOT NULL,
    "nin" character varying
);


ALTER TABLE "public"."guardians" OWNER TO "postgres";


COMMENT ON COLUMN "public"."guardians"."nin" IS 'National Identification Number';



CREATE TABLE IF NOT EXISTS "public"."payment_methods" (
    "id" integer NOT NULL,
    "code" character varying(10),
    "label" character varying,
    "active" boolean DEFAULT true,
    "has_fee" boolean DEFAULT false,
    "fee_percentage" numeric,
    "minimum_fee" numeric,
    "currency" character varying(3)
);


ALTER TABLE "public"."payment_methods" OWNER TO "postgres";


ALTER TABLE "public"."payment_methods" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."payment_methods_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."sponsors" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "full_name" character varying DEFAULT ''::character varying NOT NULL,
    "sponsor_type" character varying,
    "notes" "text",
    "active" boolean DEFAULT true
);


ALTER TABLE "public"."sponsors" OWNER TO "postgres";


COMMENT ON COLUMN "public"."sponsors"."sponsor_type" IS 'organization, religous institution, individual, etc.';



CREATE TABLE IF NOT EXISTS "public"."sponsorships" (
    "sponsorship_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "sponsor_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "child_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "start_date_time" timestamp with time zone DEFAULT "now"() NOT NULL,
    "end_date_time" timestamp with time zone DEFAULT "now"(),
    "amount" integer DEFAULT 0 NOT NULL,
    "frequency_period" smallint DEFAULT '0'::smallint,
    "sponsorship_active" boolean DEFAULT false,
    "is_recurring" boolean DEFAULT false
);


ALTER TABLE "public"."sponsorships" OWNER TO "postgres";


ALTER TABLE ONLY "public"."child_updates"
    ADD CONSTRAINT "child_updates_pkey" PRIMARY KEY ("date_time", "child_id");



ALTER TABLE ONLY "public"."children"
    ADD CONSTRAINT "children_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."communications"
    ADD CONSTRAINT "communications_pkey" PRIMARY KEY ("sponsor_id", "child_id");



ALTER TABLE ONLY "public"."consent_records"
    ADD CONSTRAINT "consent_records_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."consent_versions"
    ADD CONSTRAINT "consent_versions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."donations"
    ADD CONSTRAINT "donations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."field_officers"
    ADD CONSTRAINT "field_officers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."guardians"
    ADD CONSTRAINT "guardian_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."guardians"
    ADD CONSTRAINT "guardian_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payment_methods"
    ADD CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."sponsors"
    ADD CONSTRAINT "sponsors_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."sponsorships"
    ADD CONSTRAINT "sponsorships_pkey" PRIMARY KEY ("sponsorship_id");



ALTER TABLE ONLY "public"."child_updates"
    ADD CONSTRAINT "child_updates_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "public"."children"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."children"
    ADD CONSTRAINT "children_field_officer_id_fkey" FOREIGN KEY ("field_officer_id") REFERENCES "public"."field_officers"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."children"
    ADD CONSTRAINT "children_guardian_id_fkey" FOREIGN KEY ("guardian_id") REFERENCES "public"."guardians"("id");



ALTER TABLE ONLY "public"."communications"
    ADD CONSTRAINT "communications_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "public"."children"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."communications"
    ADD CONSTRAINT "communications_sponsor_id_fkey" FOREIGN KEY ("sponsor_id") REFERENCES "public"."sponsors"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."consent_records"
    ADD CONSTRAINT "consent_records_consent_version_id_fkey" FOREIGN KEY ("consent_version_id") REFERENCES "public"."consent_versions"("id");



ALTER TABLE ONLY "public"."consent_records"
    ADD CONSTRAINT "consent_records_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."consent_records"
    ADD CONSTRAINT "consent_records_subject_id_fkey1" FOREIGN KEY ("subject_id") REFERENCES "public"."guardians"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."donations"
    ADD CONSTRAINT "donations_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "public"."children"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."donations"
    ADD CONSTRAINT "donations_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "public"."payment_methods"("id");



ALTER TABLE ONLY "public"."donations"
    ADD CONSTRAINT "donations_sponsor_id_fkey" FOREIGN KEY ("sponsor_id") REFERENCES "public"."sponsors"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."sponsors"
    ADD CONSTRAINT "sponsors_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."sponsorships"
    ADD CONSTRAINT "sponsorships_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "public"."children"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."sponsorships"
    ADD CONSTRAINT "sponsorships_sponsor_id_fkey" FOREIGN KEY ("sponsor_id") REFERENCES "public"."sponsors"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE "public"."child_updates" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."children" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."communications" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."consent_records" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."consent_versions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."donations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."field_officers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."guardians" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."payment_methods" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."sponsors" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."sponsorships" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";








































































































































































GRANT ALL ON TABLE "public"."child_updates" TO "anon";
GRANT ALL ON TABLE "public"."child_updates" TO "authenticated";
GRANT ALL ON TABLE "public"."child_updates" TO "service_role";



GRANT ALL ON TABLE "public"."children" TO "anon";
GRANT ALL ON TABLE "public"."children" TO "authenticated";
GRANT ALL ON TABLE "public"."children" TO "service_role";



GRANT ALL ON TABLE "public"."communications" TO "anon";
GRANT ALL ON TABLE "public"."communications" TO "authenticated";
GRANT ALL ON TABLE "public"."communications" TO "service_role";



GRANT ALL ON TABLE "public"."consent_records" TO "anon";
GRANT ALL ON TABLE "public"."consent_records" TO "authenticated";
GRANT ALL ON TABLE "public"."consent_records" TO "service_role";



GRANT ALL ON TABLE "public"."consent_versions" TO "anon";
GRANT ALL ON TABLE "public"."consent_versions" TO "authenticated";
GRANT ALL ON TABLE "public"."consent_versions" TO "service_role";



GRANT ALL ON TABLE "public"."donations" TO "anon";
GRANT ALL ON TABLE "public"."donations" TO "authenticated";
GRANT ALL ON TABLE "public"."donations" TO "service_role";



GRANT ALL ON TABLE "public"."field_officers" TO "anon";
GRANT ALL ON TABLE "public"."field_officers" TO "authenticated";
GRANT ALL ON TABLE "public"."field_officers" TO "service_role";



GRANT ALL ON TABLE "public"."guardians" TO "anon";
GRANT ALL ON TABLE "public"."guardians" TO "authenticated";
GRANT ALL ON TABLE "public"."guardians" TO "service_role";



GRANT ALL ON TABLE "public"."payment_methods" TO "anon";
GRANT ALL ON TABLE "public"."payment_methods" TO "authenticated";
GRANT ALL ON TABLE "public"."payment_methods" TO "service_role";



GRANT ALL ON SEQUENCE "public"."payment_methods_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."payment_methods_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."payment_methods_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."sponsors" TO "anon";
GRANT ALL ON TABLE "public"."sponsors" TO "authenticated";
GRANT ALL ON TABLE "public"."sponsors" TO "service_role";



GRANT ALL ON TABLE "public"."sponsorships" TO "anon";
GRANT ALL ON TABLE "public"."sponsorships" TO "authenticated";
GRANT ALL ON TABLE "public"."sponsorships" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































drop extension if exists "pg_net";


