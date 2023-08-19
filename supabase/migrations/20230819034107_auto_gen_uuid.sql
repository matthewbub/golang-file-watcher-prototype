alter table "public"."users" alter column "id" set default gen_random_uuid();

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.hello_world()
 RETURNS text
 LANGUAGE sql
AS $function$

    select 'hello world';
  
  $function$
;


