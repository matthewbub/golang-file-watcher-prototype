const Database = require('./database');
const { selectTablePrompt } = require('./prompt');

const db = new Database();

async function viewAllTables() {
  db.getAllTableNames((err, tableNames) => {
    if (err) {
      console.error(err.message);
      db.close();
      return;
    }

    selectTablePrompt(tableNames)
      .then(answers => {
        const selectedTableName = answers.selectedTable;
        db.getColumnsForTable(selectedTableName, (err, columnData) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log(`Columns for table "${selectedTableName}":`);
            console.table(columnData);
          }
          db.close();
        });
      });
  });
}

// Define other functions for different options

module.exports = {
  viewAllTables,
  // Define other exported functions here
};
