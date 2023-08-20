const path = require('path');
const Database = require('../sdk');

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
        db.displayTableByName(tableName); // Use the displayTableByName method
      });

      // Close the database connection
      db.close();
    });
  } catch (error) {
    console.error('An error occurred:', error);
    db.close();
  }
})();
