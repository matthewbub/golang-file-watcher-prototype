# Tables

**Common names**. By applying these common names throughout the database design, we'll save engineers the trouble of having to identify mismatched conventions. 

- Use `owner_id` when referencing the creator
- Use `tenant_id` when referencing the tenant 
- Use `created_at` for initial time stamping 
- use `updated_at` when applying updated timestamps

# Functions
https://supabase.com/docs/guides/database/functions 

Simple function

```sql
create or replace function hello_world()
  returns text
  language sql
  as $$

    select 'hello world';
  
  $$;

select hello_world();
```

Return a collection of data

```sql
create or replace function get_documents()
  returns setof documents
  as $$

    select * from documents;
  
  $$ language sql;

select get_documents();
```
