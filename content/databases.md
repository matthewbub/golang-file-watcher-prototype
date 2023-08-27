## Developing against the database

For now, we're using this script to drop all tables and recreate them. This is a temporary solution until we have a better way to manage the database schema.

```
node ucan/admin/exec/danger-this-script-will-drop-all-tables-in-the-database.js \
&& NODE_ENV=development node ucan/admin/exec/create-tables.js \
&& NODE_ENV=development node ucan/admin/exec/seed-tables.js \
&& node ucan/admin/exec/success.js
```