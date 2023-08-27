const path = require('path');
const ConsoleDatabase = require('../sdk-console');

const db = new ConsoleDatabase();

const tableName = process.argv[2]; 

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