alter table "public"."roles_permissions_junction" drop constraint "roles_permissions_junction_permission_id_fkey";

alter table "public"."roles_permissions_junction" drop constraint "roles_permissions_junction_role_id_fkey";

alter table "public"."user_logs" drop constraint "user_logs_user_id_fkey";

alter table "public"."user_roles_junction" drop constraint "user_roles_junction_role_id_fkey";

alter table "public"."user_roles_junction" drop constraint "user_roles_junction_user_id_fkey";

alter table "public"."permissions" drop constraint "permissions_pkey";

alter table "public"."roles" drop constraint "roles_pkey";

alter table "public"."roles_permissions_junction" drop constraint "roles_permissions_junction_pkey";

alter table "public"."user_logs" drop constraint "user_logs_pkey";

alter table "public"."user_roles_junction" drop constraint "user_roles_junction_pkey";

drop index if exists "public"."permissions_pkey";

drop index if exists "public"."roles_permissions_junction_pkey";

drop index if exists "public"."roles_pkey";

drop index if exists "public"."user_logs_pkey";

drop index if exists "public"."user_roles_junction_pkey";

drop table "public"."permissions";

drop table "public"."roles";

drop table "public"."roles_permissions_junction";

drop table "public"."user_logs";

drop table "public"."user_roles_junction";

alter table "public"."users" drop column "auth_provider";

alter table "public"."users" drop column "auth_uuid";

alter table "public"."users" drop column "email";

alter table "public"."users" add column "about" text;

alter table "public"."users" add column "auth0" text;

alter table "public"."users" add column "avatar" text;

alter table "public"."users" add column "city" text;

alter table "public"."users" add column "country" text;

alter table "public"."users" add column "cover_photo" text;

alter table "public"."users" add column "state" text;

alter table "public"."users" add column "street_address_line_1" text;

alter table "public"."users" add column "street_address_line_2" text;

alter table "public"."users" add column "username" text;

alter table "public"."users" add column "zip" text;


