const inquirer = require('inquirer');

async function main() {
  const choices = ['Option 1', 'Option 2', 'Option 3']; // Replace with your options
  
  const selectedOption = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedOption',
      message: 'Select an option:',
      choices: choices,
    }
  ]);

  console.log(`You selected: ${selectedOption.selectedOption}`);
}

main();
