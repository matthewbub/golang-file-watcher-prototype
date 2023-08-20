## Developing against the database

For now, we're using this script to drop all tables and recreate them. This is a temporary solution until we have a better way to manage the database schema.

```
node ucan/admin/exec/danger__this_script_will_drop_all_tables_in_the_database.js \
&& NODE_ENV=development node ucan/admin/exec/create-tables.js
```