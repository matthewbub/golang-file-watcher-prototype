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
        'Option 1', 
        'Option 2', 
        'View all tables', // Add the new option
      ],
    }
  ]);

  switch (selectedOption.selectedOption) {
    case 'Option 1':
      console.log('You selected: Option 1');
      break;
    case 'Option 2':
      console.log('You selected: Option 2');
      break;
    case 'View all tables':
      const relativePath = './exec/view_all_tables.js';
      const absolutePath = path.resolve(__dirname, relativePath);

      // Execute the shell command using ShellJS
      if (shell.exec(`node ${absolutePath}`).code !== 0) {
        console.error('Error executing the command');
      }
      break;
    default:
      console.log(`You selected: ${selectedOption.selectedOption}`);
      break;
  }
}

main();
