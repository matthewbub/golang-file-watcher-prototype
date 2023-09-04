# Creating a React Application with Rollup: A Step-by-Step Guide

Follow the steps below to set up a React application bundled with Rollup.

#### 1. Set Up a New Project
- Open a terminal and create a new directory for your project.
  ```bash
  mkdir react-rollup-app && cd react-rollup-app
  ```
- Initialize a new Node.js project.
  ```bash
  npm init -y
  ```

#### 2. Install Dependencies
- Install React and ReactDOM.
  ```bash
  npm install react react-dom
  ```
- Install Rollup and its required plugins.
  ```bash
  npm install --save-dev rollup rollup-plugin-node-resolve rollup-plugin-commonjs rollup-plugin-babel @babel/core @babel/preset-env @babel/preset-react
  ```

#### 3. Configure Babel
- Create a `.babelrc` file in the root of your project and populate it as follows:
```javascript
{
"presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

#### 4. Configure Rollup
- Create a `rollup.config.js` file in your project root and add the following configuration.
```javascript
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
input: 'src/index.js',
output: {
  file: 'dist/bundle.js',
  format: 'iife',
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
},
plugins: [
  resolve(),
  commonjs(),
  babel({ exclude: 'node_modules/**' })
],
external: ['react', 'react-dom']
};
```

#### 5. Create Your React Component
- Make a new `src` directory and add an `index.js` file inside.
```bash
mkdir src
```
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
return <h1>Hello, world!</h1>;
}

ReactDOM.render(<App />, document.getElementById('root'));
```

#### 6. Bundle Your Application
- Add a build script to your `package.json`.
  ```javascript
  "scripts": {
    "build": "rollup -c"
  }
  ```

#### 7. Run Your Application
- Execute `npm run build` to bundle your application. This will create a `dist/bundle.js` file.
- Include this file in an HTML page to run your React application.

By following this guide, you will set up a React application configured and bundled with Rollup. You can now move forward with further development. For continuous learning, refer to our subsequent guides.


## Extending Your Rollup React Application: Adding CSS and Image Support

The next steps in enhancing your React application with Rollup involve adding support for CSS and images. Follow these instructions to implement these features.

### Add CSS Support

#### 1. **Install Necessary Plugins**
- Rollup doesn't recognize CSS by default, so plugins are required. Run these commands:
```bash
npm install --save-dev rollup-plugin-postcss
npm install --save-dev postcss autoprefixer
```

#### 2. **Update Rollup Configuration**
- Modify your `rollup.config.js` to include the postcss plugin.
```javascript
import postcss from 'rollup-plugin-postcss';
// other imports...
export default {
  // existing config...
  plugins: [
    // other plugins...
    postcss({
      plugins: [],
      minimize: true,
    })
  ]
};
```

#### 3. **Create and Import a CSS File**
- Create a `src/App.css` file with your styles.
- Import it in your `src/index.js`: `import './App.css';`

### Add Image Support

#### 1. **Install Image Plugin**
- Rollup needs a plugin to understand images. Run:
```bash
npm install --save-dev rollup-plugin-image
```
  
#### 2. **Update Rollup Configuration**
- Add the image plugin to your `rollup.config.js`.
```javascript
import image from 'rollup-plugin-image';
// other imports...
export default {
  // existing config...
  plugins: [
    // other plugins...
    image()
  ]
};
```

#### 3. **Import and Use Images**
- You can now import images as Data URLs.
```javascript
import logo from './logo.png';
function App() {
  return <img src={logo} alt="Logo" />;
}
```

Finally, run `npm run build` to bundle your application with the newly added CSS and image support. These steps should enable a richer user interface for your React application. Feel free to continue building upon your project and check our subsequent guides for more advanced topics.


## Further Enhancements: Adding a Development Server and Production Optimizations

After successfully integrating CSS and image support, your next steps involve adding a development server and optimizing the code for production.

## Add a Development Server

#### 1. **Install Development Server Plugins**
- Rollup lacks a built-in development server, necessitating external plugins. Execute this command:
```bash
npm install --save-dev rollup-plugin-serve rollup-plugin-livereload
```

#### 2. **Update Rollup Configuration**
- Modify your `rollup.config.js` to include the serve and livereload plugins.
```javascript
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
// other imports...

const production = !process.env.ROLLUP_WATCH;

export default {
  // existing config...
  plugins: [
    // other plugins...
    !production && serve({ contentBase: 'dist', port: 5000 }),
    !production && livereload('dist')
  ]
};
```

#### 3. **Add a Watch Script**
- Add a new "start" script in your `package.json` to initiate the development server.
```javascript
"scripts": {
  "start": "rollup -c -w",
  // other scripts...
}
```

Run `npm start` to boot up the development server, which will auto-refresh upon code changes.

## Optimize for Production

#### 1. **Install Minification Plugin**
- To minify your JavaScript for production, you'll need the terser plugin. Run:
```bash
npm install --save-dev rollup-plugin-terser
```

#### 2. **Update Rollup Configuration**
- Add the terser plugin to your `rollup.config.js`.
```javascript
import { terser } from 'rollup-plugin-terser';
// other imports...

export default {
  // existing config...
  plugins: [
    // other plugins...
    production && terser()
  ]
};
```

#### 3. **Set Node Environment Variable**
- Modify the build script in your `package.json` to set the Node environment to production.
```javascript
"scripts": {
  "build": "NODE_ENV=production rollup -c",
  // other scripts...
}
```

After implementing these changes, running `npm run build` will generate a minified version of your JavaScript code suitable for production. These additional steps will further streamline your application development and deployment process. As always, you are encouraged to explore our upcoming guides to advance your web development skills.