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
## 14. Start Development Server Again

Restart the development server by running:

```terminal
npm run dev
```

Navigate to your browser and check if the changes have been applied successfully.

---

