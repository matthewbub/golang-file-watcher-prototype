const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const environment = process.env.NODE_ENV || 'development';

const dbPath = path.join(__dirname, '..', 'database', `${environment}.sql`);

class Database {
  constructor() {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Connected to the database.');
      }
    });
  }

  getAllTableNames(callback) {
    const tablesQuery = "SELECT name FROM sqlite_master WHERE type='table';";
    this.db.all(tablesQuery, (err, rows) => {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      const tableNames = rows.map(row => row.name);
      callback(null, tableNames);
    });
  }

  getColumnsForTable(tableName, callback) {
    const columnsQuery = `PRAGMA table_info(${tableName});`;
    this.db.all(columnsQuery, (err, columns) => {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      const columnData = columns.map(column => ({
        'Row Name': column.name,
        'Row Type': column.type,
        'Required': column.notnull === 1,
      }));
      callback(null, columnData);
    });
  }

  displayTableByName(tableName) {
    const columnsQuery = `PRAGMA table_info(${tableName});`;
    this.db.all(columnsQuery, (err, columns) => {
      if (err) {
        console.error(err.message);
        return;
      }
      const columnData = columns.map(column => ({
        'Row Name': column.name,
        'Row Type': column.type,
        'Required': column.notnull === 1,
      }));
      console.log(`Columns for table "${tableName}":`);
      console.table(columnData);
    });
  }
  
  close() {
    this.db.close((err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Database connection closed.');
      }
    });
  }
}

module.exports = Database;
