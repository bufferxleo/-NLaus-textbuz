SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)

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

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: TB; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: activity_type; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: identity; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."identity" ("identity_id", "phone_number", "created_at") VALUES
	('b2a195a2-2c91-4892-9da4-0ce5edb6f4bf', '1234567', '2024-08-29 12:30:03.923874');


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: customer_activity; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('textbuz', 'textbuz', NULL, '2024-08-25 21:41:34.486955+00', '2024-08-25 21:41:34.486955+00', true, false, NULL, NULL, NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") VALUES
	('f575aaf8-b4f8-4bf5-a360-ccaef4217083', 'textbuz', 'profile_pictures/.emptyFolderPlaceholder', NULL, '2024-08-25 21:41:51.605597+00', '2024-08-25 21:41:51.605597+00', '2024-08-25 21:41:51.605597+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2024-08-25T21:41:52.000Z", "contentLength": 0, "httpStatusCode": 200}', '839787d9-e4f4-4c04-8e30-a7a75605265e', NULL, '{}'),
	('4f79b8a4-7f1e-4763-aa01-c53e1fbc6cff', 'textbuz', 'profile_pictures/Untitled (2).jpg', '0f34e7af-a5bc-447f-b4dc-92df698fee0f', '2024-08-27 05:35:44.182773+00', '2024-08-27 05:35:44.182773+00', '2024-08-27 05:35:44.182773+00', '{"eTag": "\"a1a590560bf6a1982ebda0f971f1e3f5\"", "size": 255398, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2024-08-27T05:35:45.000Z", "contentLength": 255398, "httpStatusCode": 200}', 'aa73047f-2cf7-4ea8-bf2d-998776ccf72b', '0f34e7af-a5bc-447f-b4dc-92df698fee0f', '{}'),
	('633c21e7-cb4a-402d-b7c5-69075b2a7057', 'textbuz', 'profile_pictures/Avatar.png', '4e191bf6-9438-45af-9276-dd52cf8b7798', '2024-08-27 05:56:47.59196+00', '2024-08-27 05:56:47.59196+00', '2024-08-27 05:56:47.59196+00', '{"eTag": "\"de4012f7044fb9a279b5e489564454f3\"", "size": 6137, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-08-27T05:56:48.000Z", "contentLength": 6137, "httpStatusCode": 200}', 'f2f85ed9-63f3-45f5-81b0-22b164821918', '4e191bf6-9438-45af-9276-dd52cf8b7798', '{}');


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: TB_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."TB_id_seq"', 1, false);


--
-- Name: activity_type_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."activity_type_type_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
