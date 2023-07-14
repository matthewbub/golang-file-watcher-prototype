import dotenv from 'dotenv';
dotenv.config();

import inquirer from 'inquirer';
import DatePrompt from "inquirer-date-prompt";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

inquirer.registerPrompt("date", DatePrompt);

// Main menu options
const mainMenuOptions = [
  {
    name: 'Add Time',
    value: 'addTime',
  },
  {
    name: 'Modify Time Entry',
    value: 'modifyTimeEntry',
  },
  {
    name: 'View Time Entries',
    value: 'viewTimeEntries',
  },
];

// Prompt for adding time
const addTimePrompt = [
  {
    type: 'input',
    name: 'task',
    message: 'Enter the task:',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Enter the description:',
  },
  {
    type: 'input',
    name: 'hours',
    message: 'Enter the number of hours (0-23):',
    validate: (input) => {
      const hours = parseInt(input);
      return Number.isInteger(hours) && hours >= 0 && hours <= 23;
    },
  },
  {
    type: 'input',
    name: 'minutes',
    message: 'Enter the number of minutes (0-59):',
    validate: (input) => {
      const minutes = parseInt(input);
      return Number.isInteger(minutes) && minutes >= 0 && minutes <= 59;
    },
  },
  {
    type: 'date',
    name: 'start_time',
    message: 'Enter the start time (timestamp):',
    validate: (input) => {
      const timestamp = Date.parse(input);
      return !isNaN(timestamp);
    },
  },
];


// Function to display the main menu
async function displayMainMenu() {
  const answer = await inquirer.prompt({
    type: 'list',
    name: 'option',
    message: 'Main Menu',
    choices: mainMenuOptions,
  });

  switch (answer.option) {
    case 'addTime':
      await addTime();
      break;
    case 'viewTimeEntries':
      viewTimeEntries();
      break;
    case 'modifyTimeEntry':
      modifyTimeEntry();
      break;
  }
}

// Function to add time
async function addTime() {
  const timeEntry = await inquirer.prompt(addTimePrompt);

  const { error } = await supabase
    .from('time_log')
    .insert([
      {
        task: timeEntry.task,
        description: timeEntry.description,
        hours: timeEntry.hours,
        minutes: timeEntry.minutes,
        start_time: timeEntry.start_time,
      },
    ]);

  if (error) {
    console.log('Error inserting time entry:', error.message);
  } else {
    console.log('Time entry inserted successfully');
  }

  // TODO: Save the time entry to your database or perform any required operations
  // Here, we are just logging the time entry for demonstration purposes

  displayMainMenu();
}

async function modifyTimeEntry() {
  console.log('Modifying time entry');

  const { data, error } = await supabase
    .from('time_log')
    .select('*');

  if (error) {
    console.log('Error retrieving time entries:', error.message);
  } else {
    console.log('Time entries retrieved successfully');
    console.table(data);
  }

  const timeEntry = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Enter the id of the time entry to modify:',
    }
  ]);

  const updatedTimeEntry = await inquirer.prompt([
    {
      type: 'input',
      default: data[timeEntry.id].task,
      name: 'task',
      message: 'Enter the task:',
    },
    {
      type: 'input',
      default: data[timeEntry.id].description,
      name: 'description',
      message: 'Enter the description:',
    },
    {
      type: 'input',
      default: data[timeEntry.id].hours,
      name: 'hours',
      message: 'Enter the number of hours (0-23):',
      validate: (input) => {
        const hours = parseInt(input);
        return Number.isInteger(hours) && hours >= 0 && hours <= 23;
      },
    },
    {
      type: 'input',
      default: data[timeEntry.id].minutes,
      name: 'minutes',
      message: 'Enter the number of minutes (0-59):',
      validate: (input) => {
        const minutes = parseInt(input);
        return Number.isInteger(minutes) && minutes >= 0 && minutes <= 59;
      },
    },
    {
      type: 'date',
      // default: data[timeEntry.id].start_time,
      name: 'start_time',
      message: 'Enter the start time (timestamp):',
      validate: (input) => {
        const timestamp = Date.parse(input);
        return !isNaN(timestamp);
      },
    },
  ]);

  const { error: updateError } = await supabase
    .from('time_log')
    .update({
      task: updatedTimeEntry.task,
      description: updatedTimeEntry.description,
      hours: updatedTimeEntry.hours,
      minutes: updatedTimeEntry.minutes,
      start_time: updatedTimeEntry.start_time,
    })
    .eq('id', timeEntry.id);

  if (updateError) {
    console.log('Error updating time entry:', updateError.message);
  } else {
    console.log('Time entry updated successfully');

    const { data, error } = await supabase
      .from('time_log')
      .select('*')

    if (error) {
      console.log('Error retrieving time entries:', error.message);
    } else {
      console.log('Time entries retrieved successfully');
      console.table(data);
    }

  }

}



// Function to view time entries
async function viewTimeEntries() {
  console.log('Viewing time entries');

  const { data, error } = await supabase
    .from('time_log')
    .select('*')

  if (error) {
    console.log('Error retrieving time entries:', error.message);
  } else {
    console.log('Time entries retrieved successfully');
    console.table(data);
  }

  // TODO: Retrieve and display the time entries from your database or perform any required operations

  displayMainMenu();
}

// Start the application
displayMainMenu();
