# https://www.fsrefs.org
## Styling 

We're using a mixture of [Tailwind](https://tailwindcss.com/) and custom CSS for styling. We can take advantage of Tailwind's utility classes to quickly style components, but we can also use custom CSS for more complex scenarios such as styling for our prose. 

For longer classNames, we'll often wrap them in `clsx` to make them easier to read. We're just using best judgement here, but we're trying to keep it consistent.

```jsx
import clsx from 'clsx'

clsx(
  "mx-auto max-w-7xl h-16",
  "flex items-center justify-between",
  "px-4 sm:px-6 md:px-8 "
)
```
