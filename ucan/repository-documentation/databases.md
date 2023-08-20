Testing the database

```
node ucan/admin/exec/danger__this_script_will_drop_all_tables_in_the_database.js \
&& NODE_ENV=development node ucan/admin/exec/create-tables.js
```