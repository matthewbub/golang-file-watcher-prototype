**Building a Custom Calendar with React & Abstract API | Step-by-step Guide** 

Learn how to build a custom calendar using React.js and the Abstract API for IP geolocation services and holiday-specific information that can be used to provide users with a custom experience.

We're going to begin by creating a new Vite project. 

## 1. Create a New Vite Project
Open your terminal and run the following command to create a new Vite project with a React template.
```bash
npx create-vite@latest my-react-app --template react
```
This command uses NPX to fetch and execute the `create-vite` package, specifying the React template through the `--template react` option.

## 2. Navigate to Project Directory
Execute the following command to navigate into your newly created project folder.
```bash
cd my-react-app
```
  
## 3. Install Dependencies
While in your project directory, run the following command to install required dependencies.
```bash
npm install
```
  
## 4. Start Development Server
Initiate the Vite development server by executing this command:
```bash
npm run dev
```
  
## 5. Preview Your App
- Open your web browser and navigate to `http://localhost:5000`.
- The URL or port number may vary; refer to the terminal output for the accurate address.
- You should now see your new React app running live.

By following these steps, you will have set up a new Vite React project, installed all the necessary dependencies, and successfully initiated the development server. You're now ready to begin building your web application. Continue your learning journey with our subsequent guides to enhance your skills further.

### Sources:
We highly value transparency and believe that multiple perspectives can enrich your learning experience. Below are some additional resources that have guided us in creating the instructional content provided to you.
- [Getting Started | Vite](https://vitejs.dev/guide/)
- [How To Set Up a React Project with Vite](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-react-project-with-vite)
- [Using Vite to create a new React app](https://flaviocopes.com/vite-react-app/) 

---

# Install TailwindCSS in your Vite React Application

After setting up your Vite React project, you can install TailwindCSS by following these steps:

## 6. Install TailwindCSS, PostCSS, and autoprefixer

In your project directory, run the following command to install TailwindCSS, PostCSS, and autoprefixer:

```terminal
npm install tailwindcss postcss autoprefixer
```

## 7. Generate Tailwind Configuration Files

Generate the Tailwind configuration files by running:

```terminal
npx tailwindcss init -p
```

This command will create two files in your project directory: `tailwind.config.js` and `postcss.config.js`.

## 8. Configure TailwindCSS

Open the `tailwind.config.js` file and modify it as follows:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


```

This configuration tells TailwindCSS to remove unused styles in production and where to look for your files.

## 9. Import TailwindCSS into your project

In your project’s main CSS file (usually `src/index.css`), import TailwindCSS by adding the following lines:

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

## 10. Use TailwindCSS in your project

You can now start using TailwindCSS classes in your project. For example, in your `src/App.jsx` file, you can update the `className` prop as follows:

```javascript
return (
  <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-5xl font-bold">Hello, world!</h1>
  </div>
);
```

## 11. Start Development Server Again

Restart the development server by running:

```terminal
npm run dev
```

Navigate to your browser and check if the changes have been applied successfully.

By following these additional steps, you will have successfully installed TailwindCSS into your Vite React project, and you can start using its utility classes in your components.

### Sources:

- [TailwindCSS - Installation](https://tailwindcss.com/docs/installation)

# Adding DaisyUI (Optional)
Let's add DaisyUI to help with styling.

## 12. Install DaisyUI via NPM
```terminal
npm i -D daisyui@latest
```

## 13. Add DaisyUI to your Tailwind Config
Add daisyUI to your Tailwind Config as a plugin
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")]
}
```

## 14. Update your App.jsx
```jsx
function App() {
  return (
    <div className='pt-12 max-w-7xl mx-auto px:4 sm:px-6 md:px-8'>
      <div className="alert alert-info">
        <span>Here's a DaisyUI Notification!</span>
      </div>
      <div className="mt-40 flex items-center justify-center">
        <h1 className="text-5xl font-bold">Hello, world!</h1>
      </div>
    </div>
  )
}

export default App
```

## 14. Start Development Server Again

Restart the development server by running:

```terminal
npm run dev
```

Navigate to your browser and check if the changes have been applied successfully.

---

# How to build a Calendar with React
###
Building a React Calendar App Using Vite and date-fns

This guide will walk you through the steps to build a calendar application using React, Vite, and the date-fns library. The application displays a month view of a calendar where you can navigate between months.

#### Prerequisites

- Node.js and npm installed
- Basic knowledge of React

#### Steps

##### 1. Initialize a Vite Project
Create a new Vite project with React template.
```shell
npx create-vite@latest my-calendar-app --template react
```

Navigate to the project directory.
```
cd my-calendar-app
```

##### 2. Install date-fns
Add the `date-fns` package to your project.
```terminal
npm install date-fns
```

## List the current months dates
This will present a list of all the days within the current month. 
```jsx
import React, { useEffect, useState } from 'react';
import { eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';

const App = () => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const now = new Date(); // Get current date
    const start = startOfMonth(now); // Find first day of the month
    const end = endOfMonth(now); // Find last day of the month

    // Get array of dates for current month
    const dateArray = eachDayOfInterval({ start, end });

    setDates(dateArray);
  }, []);

  return (
    <div>
      {dates.map((date, index) => (
        <p key={index}>{date.toString()}</p>
      ))}
    </div>
  );
};

export default App;
```

## Fit the dates into cells
To fit the dates into a 7x5 or 7x6 grid, you would need to consider the day of the week that the first day of the month falls on. Depending on the day, you might need to fill in some cells at the beginning of the grid with the last few days of the previous month. Similarly, you might need to fill in some cells at the end with the first few days of the next month.

Here is a simplified example of how you could generate such a grid using React and date-fns:
```jsx
import React, { useEffect, useState } from 'react';
import { eachDayOfInterval, startOfMonth, endOfMonth, startOfWeek, endOfWeek, format } from 'date-fns';

const Calendar = () => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const now = new Date(); // Get current date
    const start = startOfWeek(startOfMonth(now)); // Find first day of the month, then go to the start of that week
    const end = endOfWeek(endOfMonth(now)); // Find last day of the month, then go to the end of that week

    // Get array of dates for current month, including some dates from previous and next month
    const dateArray = eachDayOfInterval({ start, end });

    setDates(dateArray);
  }, []);

  return (
   <div className="grid grid-cols-7 gap-2">
      {dates.map((date, index) => (
        <div key={index} className="border border-gray-300 p-2">
          {format(date, 'd')}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
```

## Let's add a heading that displays the current date
In this code, I've added a `currentMonth` state variable and set its value to the current month and year when the component mounts. The `format` function is used with the format string `'MMMM yyyy'`, which will output the full name of the month followed by the four-digit year (for example, "September 2023").

I've also added a `<h1>` element above the grid that displays the `currentMonth`. The Tailwind CSS classes `text-center text-lg font-bold mb-4` are used to style this heading.

```jsx
import React, { useEffect, useState } from 'react';
import { eachDayOfInterval, startOfMonth, endOfMonth, startOfWeek, endOfWeek, format } from 'date-fns';

const Calendar = () => {
  const [dates, setDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    const now = new Date(); // Get current date
    const start = startOfWeek(startOfMonth(now)); // Find first day of the month, then go to the start of that week
    const end = endOfWeek(endOfMonth(now)); // Find last day of the month, then go to the end of that week

    // Set current month
    setCurrentMonth(format(now, 'MMMM yyyy'));

    // Get array of dates for current month, including some dates from previous and next month
    const dateArray = eachDayOfInterval({ start, end });

    setDates(dateArray);
  }, []);

  return (
    <div>
      <h1 className="text-center text-lg font-bold mb-4">{currentMonth}</h1>
      <div className="grid grid-cols-7 gap-2">
        {dates.map((date, index) => (
          <div key={index} className="border border-gray-300 p-2">
            {format(date, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
```

## Lets add the next month / previous month buttons
1. I've refactored the date generation logic into a separate `generateDates` function, which accepts a date and generates dates for the month of that date.
2. I've added `nextMonth` and `prevMonth` functions that call `setCurrentMonth` with the result of `addMonths` and `subMonths`, respectively. These functions add or subtract one month from the currently displayed month.
3. I've added "Prev" and "Next" buttons that call these functions when clicked.

When you click the buttons, it will change the `currentMonth` state, triggering the `useEffect` hook to regenerate the dates for the new month.
```jsx
import React, { useEffect, useState } from 'react';
import { eachDayOfInterval, startOfMonth, endOfMonth, startOfWeek, endOfWeek, format, addMonths, subMonths } from 'date-fns';

const Calendar = () => {
  const [dates, setDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const generateDates = (date) => {
    const start = startOfWeek(startOfMonth(date)); // Find first day of the month, then go to the start of that week
    const end = endOfWeek(endOfMonth(date)); // Find last day of the month, then go to the end of that week

    // Get array of dates for current month, including some dates from previous and next month
    const dateArray = eachDayOfInterval({ start, end });

    setDates(dateArray);
  }

  useEffect(() => {
    generateDates(currentMonth);
  }, [currentMonth]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className='max-w-5xl mx-auto'>
      <div className='flex justify-between items-center py-6'>
        <button className='btn btn-primary' onClick={prevMonth}>Prev</button>
        <h1 className="text-center text-lg font-bold">{format(currentMonth, 'MMMM yyyy')}</h1>
        <button className='btn btn-primary' onClick={nextMonth}>Next</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {dates.map((date, index) => (
          <div key={index} className="border border-gray-300 p-2">
            {format(date, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
```

---
## Abstract API Configuration and Setting Vite Env Secrets 
here's how to use environment variables in a Vite project with `import.meta.env`:
1. Create an account with Abstract API
2. Navigate to your dashboard and then select the IP Geolocation tab from the side navigation and grab the API key. It's unique to this endpoint.  i.e. https://app.abstractapi.com/api/ip-geolocation/tester 
3. Next, navigate to the Holidays API tab from the side navigate and grab that API key i.e https://app.abstractapi.com/api/holidays/tester 
4. now we can create an `.env` file in the root of your project.
5. within this file, set your API key like so: `VITE_ABSTRACT_API_KEY=your_api_key_here`. Note that Vite requires you to prefix your variables with `VITE_` to expose them to your client-side code.

Your .env file should look something like this:

```shell
VITE_ABSTRACT_API_GEO_LOCATION=your_geo_location_api_key_here
VITE_ABSTRACT_API_HOLIDAYS=your_holidays_api_key_here
```
3. Now, you can access the API key in your code with `import.meta.env.VITE_ABSTRACT_API_KEY`.

Here's an example of how to use it:

```javascript
console.log(import.meta.env.VITE_ABSTRACT_API_GEO_LOCATION);
```

Remember to add your `.env` file to your `.gitignore` file so it's not included in your version control system. This is to protect your secrets from being exposed.

Also, keep in mind that any variables that start with `VITE_` will be publicly exposed, meaning they will be accessible in the browser. For this reason, don't put any secrets or sensitive information under variables that start with `VITE_`.

Sources:

- [Env Variables and Modes - Vite.js Guide](https://vitejs.dev/guide/env-and-mode.html)

#  GeoLocation API

1. We need the Geolocation API request to execute as soon as the user hits the page. Let's make a useEffect that can account for this logic
```jsx

const App = () => {
  useEffect(() => {
    const url = "https://ipgeolocation.abstractapi.com/v1/?api_key=" + import.meta.env.VITE_ABSTRACT_API_GEO_LOCATION;
    
    fetch(url)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }, []);
  
  return (
    <Calendar />
  )
}

export default App;
```

2. Within the .then statement should be 



---

- We're going to style it in QCL and not beta because AWS
- impl questions; Colin, also Marlene 
- Part 0 & 1. are going to be the most directio that we have at the moment

STRs
- SIgnin as `a` 
- from top nav select ROLES
    - Select CAPHM 

- Most of part 1 will be in Sponsor portal because thats the only one that is ready for development 

- If something isn't working; it might be in AWS. 
    - QCL and QCC should not be connected to AWS 


- We cant do a 1.5 if we cant access the portal 
- Basically, we have to work in QCL; unless local changes happen with ZScaler 
    - we dont know how to work locally with AWS yet its uncharted territory 

- Reach out to Andrew to see what he had to do differently for Clover 
- Reach out to Flamingo Floor for Part 0
    - How do I get this flamingoized portion setup in a part 0 

- Find out if what flamingoized features does this payer have?


- Part 0 is just setting up components
- Part 1 is just looking at individual components 
    - Part 1 is part of the header
    - Footer is in its own ticket 


---
- Part 0 with Andrew 
    - Refrenced Aubreys stuff
    - Ran some scripts
    - pull up locally if you can 
---

Mondays Wendsays and Fridays 
Parking lot 15 - Logistical services building (South end of parking lot) - Coming from the 15 to college ave, just a couple turns 
Closer to the 8 freeweay
- Property surposlu office in the front left hand corner on the left hand side of the building facing East. (Public supruls )
1pm-4pm 
8:30am- 330pm (Closed from 12-1pm) 