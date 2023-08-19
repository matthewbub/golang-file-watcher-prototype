alter table "public"."documents" alter column "id" set default gen_random_uuid();

alter table "public"."logs" alter column "id" set default gen_random_uuid();

alter table "public"."screens" alter column "id" set default gen_random_uuid();

alter table "public"."subscribers" alter column "id" set default gen_random_uuid();

alter table "public"."tenants" alter column "id" set default gen_random_uuid();


