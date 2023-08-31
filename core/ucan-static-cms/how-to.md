Goal: Build a static CMS that automatically creates and reads static html files in a WYSIWYG editor

1. Create a new directory, navigate to it
2. Within that directory, we can create a `package.json` with the required fields `name` and `version`
3. Next, let's install `react`, `react-dom`, and `next` as dependencies
4. We can then create a `app` directory, and within that, a `index.jsx` file
5. Within `index.jsx`, we can import `react` and `react-dom`, and then export a function that returns a `div` with the text "Hello World"

```jsx
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

6. We can also create a `layout.jsx` file within the `app` directory. This layout allows for the modification of the initial HTML returned from the server. 

```jsx
export default function Layout({ children }) {
  return <div>{children}</div>
}
```

7. We can then add a `build`, `start` and `dev` scripts to our `package.json` file
```json
{
  // ...
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
  // ..
}
```
8. To run our app, we can run `npm run dev` and navigate to `localhost:3000` in our browser. This is a good time to ensure everything is working as expected. Cool, that's the basics of Next.js.

9. 