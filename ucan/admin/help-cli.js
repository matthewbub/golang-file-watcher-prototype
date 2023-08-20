const inquirer = require('inquirer');
const shell = require('shelljs');
const path = require('path');
const Database = require('./sdk');

async function main() {
  const db = new Database();
  const selectedOption = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedOption',
      message: 'Select an option:',
      choices: [
        'View all tables',
        'View table by name',
        'Exit'
      ],
    }
  ]);

  switch (selectedOption.selectedOption) {
    case 'View all tables':
      const relativePathViewAllTables = './exec/view_all_tables.js';
      const absolutePathViewAllTables = path.resolve(__dirname, relativePathViewAllTables);

      // Execute the shell command using ShellJS
      if (shell.exec(`node ${absolutePathViewAllTables}`).code !== 0) {
        console.error('Error executing the command');
      }

      main();
      break;

    case 'View table by name':
      const tableNames = await db.getTableNames();
      const selectedTable = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedTable',
          message: 'Select a table:',
          choices: tableNames,
        }
      ]);

      const relativePathViewTableByName = './exec/view_table_by_name.js';
      const absolutePathViewTableByName = path.resolve(__dirname, relativePathViewTableByName);

      // Execute the shell command using ShellJS
      if (shell.exec(`node ${absolutePathViewTableByName} ${selectedTable.selectedTable}`).code !== 0) {
        console.error('Error executing the command');
      }

      main();
      break;

    case 'Exit':
      console.log('Exiting...');
      break;      
    default:
      console.log(`You selected: ${selectedOption.selectedOption}`);
      break;
  }
}

main();
