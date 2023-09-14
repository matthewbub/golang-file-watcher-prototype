***

tags: \[micro, nodejs, rollup]
description: "Building a Basic Node.js Application using Rollup"
----------------------------------------------------------------

# Building a Basic Node.js Application using Rollup

Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application. It allows you to write your code using the latest JavaScript features, and then it will bundle it up into a package that can run anywhere.

In this guide, we're going to build a simple Node.js application using Rollup. We'll start from scratch, setting up our project, installing dependencies, configuring Rollup, and writing some code.

## Step 1: Setting Up Your Project

First, create a new directory for your project and navigate into it:

```shell
mkdir hello-world && cd hello-world
```

Then, initialize a new Node.js project. You can do this by running npm init and following the prompts. For now, you can just hit return to accept the defaults:

```shell
npm init -y
```

This will create a new package.json file in your project root.

## Step 2: Installing Dependencies

We need to install Rollup and some plugins that will help us work with Node.js and Express:

```shell
npm install --save-dev rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs
```

Let's break down the code and the purpose of the two plugins:

*   `@rollup/plugin-node-resolve`:

    *   **Purpose**: This plugin helps Rollup to locate and bundle third-party dependencies in `node_modules`. It's essential when you're using external modules.

    *   **Details**: The `preferBuiltins` option is set to `true`, which means that if a built-in module (like `fs` or `path` in Node.js) is imported, the plugin will prefer the built-in version over any local versions.

*   `@rollup/plugin-commonjs`:

    *   **Purpose**: Rollup understands ES modules out of the box, but it doesn't understand CommonJS modules. This plugin converts CommonJS modules to ES6, making them compatible with Rollup's bundling mechanism.

    *   **Details**: The plugin is used with its default settings in the provided code.

## Step 3: Configuring Rollup

Create a new file in your project root named `rollup.config.mjs` and add the following content:

```js rollup.config.mjs
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    resolve({
      preferBuiltins: true
    }),
    commonjs()
  ]
};
```

This tells Rollup where our entry point is (src/index.js), where to output the bundled file (dist/bundle.js), and which plugins to use.

Here's a more detailed breakdown of the code:
- `input`: `'src/index.js'`: This is the entry point for your application or library.
- `output`: This object defines how the final bundle will be outputted.
  - `file: 'dist/bundle.js'`: The bundled file will be saved as bundle.js in the dist directory.
  - `format: 'cjs'`: The output format will be CommonJS.
- `plugins`: An array of plugins used during the bundling process.
- `external: ['fastify']`: This tells Rollup to not bundle fastify but treat it as an external dependency. This might be useful if you're creating a library and you don't want to include certain dependencies in the final bundle, expecting the consumer to have them installed.

## Step 4: Writing Your Code

Create a new directory named src in your project root, and inside it, create a new file named index.js:

```shell
mkdir src && touch src/index.js
```

Open src/index.js in your text editor and add the following code:

```js
console.log('Hello world!')
```

This is the code that will be run when we start our application.

## Step 5: Building and Running Your Application

Finally, let's add some scripts to our package.json to make building and running our application easier:

```json
"scripts": {
  "build": "rollup -c",
  "start": "node dist/bundle.js",
  "dev": "rollup -c -w"
}
```

Now you can build your application by running npm run build. This will create a new file at dist/bundle.js.

You can run your bundled application with npm start.

And if you're developing, you can have Rollup watch your files and rebuild whenever they change with npm run dev.

Congratulations! You've just built your first Node.js application using Rollup.
