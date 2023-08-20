const path = require('path');
const Database = require('../sdk');


const db = new Database();

const tableName = process.argv[2]; // Get the table name from command line argument

(async () => {
  try {
    if (!tableName) {
      console.error('Table name not provided.');
      db.close();
      return;
    }

    db.console___displayTableByName(tableName, (err, columnData) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`Table: ${tableName}`);
        console.table(columnData);
      }
      db.close();
    });
  } catch (error) {
    console.error('An error occurred:', error);
    db.close();
  }
})();