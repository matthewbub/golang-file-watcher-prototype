const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const environment = process.env.NODE_ENV || 'development';

const dbPath = path.join(__dirname, '..', '..', 'database', `${environment}.sql`);
const sqlFilePath = path.join(__dirname, '..', '..', 'database', 'schemas', 'init.sql');
const sql = fs.readFileSync(sqlFilePath, 'utf8');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error(err.message);
  console.log('Connected to the database.');
});

(async () => {
  await db.exec(sql, async (err) => {
    if (err) console.error(err.message);
    console.log('Database initialized.');

    // Retrieve the list of created fields
    const fieldsQuery = "SELECT name FROM sqlite_master WHERE type='table';";
    db.all(fieldsQuery, (err, rows) => {
      if (err) console.error(err.message);
      else {
        rows.forEach(async (row) => {
          const tableName = row.name;

          // Retrieve column information for the current table
          const columnsQuery = `PRAGMA table_info(${tableName});`;
          db.all(columnsQuery, (err, columns) => {
            if (err) console.error(err.message);
            else {
              const columnData = columns.map(column => ({
                'Row Name': column.name,
                'Row Type': column.type,
                'Required': column.notnull === 1,
              }));
              console.log(`[INFO] Successfully created: ${tableName}`);
              console.table(columnData);
            }
          });
        });
      }

      // Close the database connection
      db.close((err) => {
        if (err) console.error(err.message);
        console.log('Database connection closed.');
      });
    });
  });
})();
