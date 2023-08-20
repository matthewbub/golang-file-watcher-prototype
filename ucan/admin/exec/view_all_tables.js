const path = require('path');
const Database = require('../../ucan-admin-sdk/database'); 

const db = new Database(); 

(async () => {
  try {
    // Get all table names from the database
    db.getAllTableNames((err, tableNames) => {
      if (err) {
        console.error(err.message);
        db.close();
        return;
      }

      // Display information about each table
      tableNames.forEach((tableName) => {
        console.log(`Table: ${tableName}`);
        db.getColumnsForTable(tableName, (err, columnData) => {
          if (err) {
            console.error(err.message);
          } else {
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
