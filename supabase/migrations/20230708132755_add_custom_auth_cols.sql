alter table "public"."users" drop column "auth0";

alter table "public"."users" add column "email" text;

alter table "public"."users" add column "password" text not null;

alter table "public"."users" add column "user_id" uuid not null;

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";


