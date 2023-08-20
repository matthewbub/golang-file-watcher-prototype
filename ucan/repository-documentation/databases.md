Testing the database

```
node ucan/admin/danger__this_script_will_drop_all_tables_in_the_database.js \
&& NODE_ENV=development node ucan/admin/create-tables.js
```