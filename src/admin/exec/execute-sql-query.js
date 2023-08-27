const path = require('path');
const ConsoleDatabase = require('../sdk-console');

const db = new ConsoleDatabase();

const query = process.argv[2]; 

(async () => {
  try {
    if (!query) {
      console.error('[INFO]: query not provided.');
      db.close();
      return;
    }

    db.runQuery(query, (err, rows) => {
      if (err) {
        console.error('[ERROR]: ' + err.message);
      } else {
        console.log('[INFO]: Query results:');
        console.table(rows);
      }
      db.close();
    });

  } catch (error) {
    console.error('[ERROR]: An error occurred:', error);
    db.close();
  }
})();