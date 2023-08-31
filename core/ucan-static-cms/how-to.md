Goal: Build a static CMS that automatically creates and reads static html files in a WYSIWYG editor

1. Create a new directory, navigate to it
2. Within that directory, we can create a `package.json` with the required fields `name` and `version`
3. Next, let's install `react`, `react-dom`, and `next` as dependencies
4. We can then create a `app` directory, and within that, a `index.jsx` file
5. Within `index.jsx`, we can import `react` and `react-dom`, and then export a function that returns a `div` with the text "Hello World"

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

export default () => <div>Hello World</div>
```

6. We can then add a `build`, `start` and `dev` scripts to our `package.json` file
