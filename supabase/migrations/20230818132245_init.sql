create table "public"."document_categories" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone,
    "category" text,
    "owner_id" uuid,
    "color" text
);


create table "public"."documents" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "document_title" text default 'Untitled Document'::text,
    "document_html" text,
    "document_json" text,
    "owner_id" uuid,
    "visibility" text,
    "document_description" text,
    "page_title" text,
    "primary_image" text
);


create table "public"."logs" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "name" text,
    "data" json,
    "log_type" text,
    "log_message" text,
    "log_status" text
);


create table "public"."screens" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "last_updated" timestamp with time zone default now(),
    "name" text not null,
    "tenant_id" uuid,
    "owner_id" uuid,
    "document_id" uuid
);


create table "public"."subscribers" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "email" text not null
);


create table "public"."tenants" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "name" text not null
);


create table "public"."users" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "email" text not null,
    "password" text not null,
    "phone" text not null,
    "auth_type" text,
    "first_name" text,
    "last_name" text,
    "author_display_name" text,
    "tenant_id" bigint not null
);


CREATE UNIQUE INDEX document_categories_pkey ON public.document_categories USING btree (id);

CREATE UNIQUE INDEX documents_pkey ON public.documents USING btree (id);

CREATE UNIQUE INDEX logs_pkey ON public.logs USING btree (id);

CREATE UNIQUE INDEX screens_pkey ON public.screens USING btree (id);

CREATE UNIQUE INDEX subscribers_email_key ON public.subscribers USING btree (email);

CREATE UNIQUE INDEX subscribers_pkey ON public.subscribers USING btree (id);

CREATE UNIQUE INDEX tenants_pkey ON public.tenants USING btree (id);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."document_categories" add constraint "document_categories_pkey" PRIMARY KEY using index "document_categories_pkey";

alter table "public"."documents" add constraint "documents_pkey" PRIMARY KEY using index "documents_pkey";

alter table "public"."logs" add constraint "logs_pkey" PRIMARY KEY using index "logs_pkey";

alter table "public"."screens" add constraint "screens_pkey" PRIMARY KEY using index "screens_pkey";

alter table "public"."subscribers" add constraint "subscribers_pkey" PRIMARY KEY using index "subscribers_pkey";

alter table "public"."tenants" add constraint "tenants_pkey" PRIMARY KEY using index "tenants_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."document_categories" add constraint "document_categories_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES users(id) not valid;

alter table "public"."document_categories" validate constraint "document_categories_owner_id_fkey";

alter table "public"."documents" add constraint "documents_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES users(id) not valid;

alter table "public"."documents" validate constraint "documents_owner_id_fkey";

alter table "public"."screens" add constraint "screens_document_id_fkey" FOREIGN KEY (document_id) REFERENCES documents(id) not valid;

alter table "public"."screens" validate constraint "screens_document_id_fkey";

alter table "public"."screens" add constraint "screens_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES users(id) not valid;

alter table "public"."screens" validate constraint "screens_owner_id_fkey";

alter table "public"."screens" add constraint "screens_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."screens" validate constraint "screens_tenant_id_fkey";

alter table "public"."subscribers" add constraint "subscribers_email_key" UNIQUE using index "subscribers_email_key";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";


