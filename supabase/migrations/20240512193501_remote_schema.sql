
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

CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA "pg_catalog";

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

CREATE TABLE IF NOT EXISTS "public"."Events" (
    "Id" integer NOT NULL,
    "EventName" character varying(255) NOT NULL
);

ALTER TABLE "public"."Events" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."Events_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."Events_Id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."Events_Id_seq" OWNED BY "public"."Events"."Id";

CREATE TABLE IF NOT EXISTS "public"."Riders" (
    "Id" integer NOT NULL,
    "EventId" integer,
    "Confirmed" boolean,
    "RaceNr" integer,
    "UciRiderId" character varying(255),
    "UciCode" character varying(255),
    "FamilyName" character varying(255),
    "GivenName" character varying(255),
    "CategoryCode" character varying(100),
    "PrintName" character varying(255),
    "ScoreboardName" character varying(255),
    "Nation" character varying(100),
    "UciTeamId" character varying(100),
    "UciTeamCode" character varying(100),
    "UciTeamName" character varying(255),
    "WorldCupRank" integer,
    "UciRank" integer,
    "SecondaryRank" integer,
    "StartOrder" integer,
    "StartTime" bigint,
    "Outfit" character varying(255),
    "BirthDate" "date",
    "Protected" boolean,
    "IntEliteNr" boolean,
    "Rso" boolean,
    "Injury" boolean,
    "Substitute" boolean
);

ALTER TABLE "public"."Riders" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."SplitTimes" (
    "Id" integer NOT NULL,
    "RaceNr" integer,
    "UciRiderId" character varying(255) NOT NULL,
    "Run" integer,
    "LastPoint" character varying(100),
    "CompletedDistance" integer,
    "Position" integer,
    "InResult" boolean,
    "RaceTime" bigint,
    "Status" character varying(255),
    "Speed" numeric(10,3),
    "StatusTime" bigint,
    "SortOrder" integer,
    "ExpectedStartTime" bigint
);

ALTER TABLE "public"."SplitTimes" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."SplitTimes_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."SplitTimes_Id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."SplitTimes_Id_seq" OWNED BY "public"."SplitTimes"."Id";

ALTER TABLE ONLY "public"."Events" ALTER COLUMN "Id" SET DEFAULT "nextval"('"public"."Events_Id_seq"'::"regclass");

ALTER TABLE ONLY "public"."SplitTimes" ALTER COLUMN "Id" SET DEFAULT "nextval"('"public"."SplitTimes_Id_seq"'::"regclass");

ALTER TABLE ONLY "public"."Events"
    ADD CONSTRAINT "Events_EventName_key" UNIQUE ("EventName");

ALTER TABLE ONLY "public"."Events"
    ADD CONSTRAINT "Events_pkey" PRIMARY KEY ("Id");

ALTER TABLE ONLY "public"."Riders"
    ADD CONSTRAINT "Riders_UciRiderId_key" UNIQUE ("UciRiderId");

ALTER TABLE ONLY "public"."Riders"
    ADD CONSTRAINT "Riders_pkey" PRIMARY KEY ("Id");

ALTER TABLE ONLY "public"."SplitTimes"
    ADD CONSTRAINT "SplitTimes_pkey" PRIMARY KEY ("Id");

CREATE INDEX "idx_EventId" ON "public"."Riders" USING "btree" ("EventId");

CREATE INDEX "idx_Nation" ON "public"."Riders" USING "btree" ("Nation");

CREATE INDEX "idx_Position" ON "public"."SplitTimes" USING "btree" ("Position");

CREATE INDEX "idx_RaceNr" ON "public"."SplitTimes" USING "btree" ("RaceNr");

CREATE INDEX "idx_RaceNr_Riders" ON "public"."Riders" USING "btree" ("RaceNr");

CREATE INDEX "idx_Run" ON "public"."SplitTimes" USING "btree" ("Run");

CREATE INDEX "idx_Status" ON "public"."SplitTimes" USING "btree" ("Status");

CREATE INDEX "idx_UciRiderId" ON "public"."Riders" USING "btree" ("UciRiderId");

CREATE INDEX "idx_UciRiderId_SplitTimes" ON "public"."SplitTimes" USING "btree" ("UciRiderId");

ALTER TABLE ONLY "public"."Riders"
    ADD CONSTRAINT "Riders_EventId_fkey" FOREIGN KEY ("EventId") REFERENCES "public"."Events"("Id");

ALTER TABLE ONLY "public"."SplitTimes"
    ADD CONSTRAINT "SplitTimes_UciRiderId_fkey" FOREIGN KEY ("UciRiderId") REFERENCES "public"."Riders"("UciRiderId");

CREATE POLICY "Enable select for authenticated users only" ON "public"."Events" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable select for authenticated users only" ON "public"."Riders" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable select for authenticated users only" ON "public"."SplitTimes" FOR SELECT TO "authenticated" USING (true);

ALTER TABLE "public"."Events" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."Riders" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."SplitTimes" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."Events";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."Riders";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."SplitTimes";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."Events" TO "anon";
GRANT ALL ON TABLE "public"."Events" TO "authenticated";
GRANT ALL ON TABLE "public"."Events" TO "service_role";

GRANT ALL ON SEQUENCE "public"."Events_Id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."Events_Id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."Events_Id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."Riders" TO "anon";
GRANT ALL ON TABLE "public"."Riders" TO "authenticated";
GRANT ALL ON TABLE "public"."Riders" TO "service_role";

GRANT ALL ON TABLE "public"."SplitTimes" TO "anon";
GRANT ALL ON TABLE "public"."SplitTimes" TO "authenticated";
GRANT ALL ON TABLE "public"."SplitTimes" TO "service_role";

GRANT ALL ON SEQUENCE "public"."SplitTimes_Id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."SplitTimes_Id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."SplitTimes_Id_seq" TO "service_role";

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
