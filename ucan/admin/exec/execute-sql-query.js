const path = require('path');
const ConsoleDatabase = require('../sdk-console');

const db = new ConsoleDatabase();

const query = process.argv[2]; 

(async () => {
  try {
    if (!query) {
      console.error('query not provided.');
      db.close();
      return;
    }

    db.runQuery(query, (err, rows) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Query results:');
        console.table(rows);
      }
      db.close();
    });

  } catch (error) {
    console.error('An error occurred:', error);
    db.close();
  }
})();