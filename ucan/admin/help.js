const inquirer = require('inquirer');
const shell = require('shelljs');
const path = require('path');

async function main() {
  const selectedOption = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedOption',
      message: 'Select an option:',
      choices: [
        'View all tables', 
        'Exit'
      ],
    }
  ]);

  switch (selectedOption.selectedOption) {
    case 'View all tables':
      const relativePath = './exec/view_all_tables.js';
      const absolutePath = path.resolve(__dirname, relativePath);

      // Execute the shell command using ShellJS
      if (shell.exec(`node ${absolutePath}`).code !== 0) {
        console.error('Error executing the command');
      }
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
