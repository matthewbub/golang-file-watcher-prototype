const inquirer = require('inquirer');
const shell = require('shelljs');
const path = require('path');
const ConsoleDatabase = require('./sdk-console');

async function main() {
  const db = new ConsoleDatabase();
  const selectedOption = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedOption',
      message: 'Select an option:',
      choices: [
        'View all tables',
        'View table schema by name',
        'Execute SQL query',
        'Exit'
      ],
    }
  ]);

  switch (selectedOption.selectedOption) {
    case 'View all tables':
      const relativePathViewAllTables = './exec/view-all-tables.js';
      const absolutePathViewAllTables = path.resolve(__dirname, relativePathViewAllTables);

      // Execute the shell command using ShellJS
      if (shell.exec(`node ${absolutePathViewAllTables}`).code !== 0) {
        console.error('Error executing the command');
      }

      main();
      break;

    case 'View table schema by name':
      const tableNames = await db.getTableNames();
      const selectedTable = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedTable',
          message: 'Select a table:',
          choices: tableNames,
        }
      ]);

      const relativePathViewTableByName = './exec/view-table-schema-by-name.js';
      const absolutePathViewTableByName = path.resolve(__dirname, relativePathViewTableByName);

      // Execute the shell command using ShellJS
      if (shell.exec(`node ${absolutePathViewTableByName} ${selectedTable.selectedTable}`).code !== 0) {
        console.error('Error executing the command');
      }

      main();
      break;

    case 'Execute SQL query':

      const sqlQuery = await inquirer.prompt([
        {
          type: 'input',
          name: 'sqlQuery',
          message: 'Enter the SQL query:',
        }
      ]);

      const relativePathExecuteSQLQuery = './exec/execute-sql-query.js';
      const absolutePathExecuteSQLQuery = path.resolve(__dirname, relativePathExecuteSQLQuery);

      // Execute the shell command using ShellJS
      if (shell.exec(`node ${absolutePathExecuteSQLQuery} "${sqlQuery.sqlQuery}"`).code !== 0) {
        console.error('Error executing the command');
      }
    
      main();
      break;
   
    case 'Exit':
      console.log('Exiting...');
      db.close();
      break;
    
    default:
      console.log('Unknown option, Exiting...');
      db.close();
      break;
  }
}

main();
