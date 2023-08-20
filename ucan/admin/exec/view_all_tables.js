const path = require('path');
const Database = require('../sdk'); 

const db = new Database(); 

(async () => {
  try {
    // Get all table names from the database
    db.console___getAllTableNames((err, tableNames) => {
      if (err) {
        console.error(err.message);
        db.close();
        return;
      }

      // Display information about each table
      tableNames.forEach((tableName) => {
        db.console___getColumnsForTable(tableName, (err, columnData) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log(`Table: ${tableName}`);
            console.table(columnData);
          }
        });
      });

      // Close the database connection
      db.close();
    });
  } catch (error) {
    console.error('An error occurred:', error);
    db.close();
  }
})();
