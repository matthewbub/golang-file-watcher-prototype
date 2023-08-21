const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const environment = process.env.NODE_ENV || 'development';

const dbPath = path.join(__dirname, '..', '..', 'database', `${environment}.sql`);
const sqlFilePath = path.join(__dirname, '..', '..', 'database', 'schemas', 'seed.sql');
const sql = fs.readFileSync(sqlFilePath, 'utf8');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('[ERROR]: ' + err.message);
  console.log('[INFO]: Connected to the database. @ ucan/admin/exec/seed-tables.js');
});

(async () => {
  await db.exec(sql, async (err) => {
    if (err) console.error('[ERROR]: ' + err.message);
    console.log('[INFO]: Seed script executed. @ ucan/admin/exec/seed-tables.js');
  });
})();
