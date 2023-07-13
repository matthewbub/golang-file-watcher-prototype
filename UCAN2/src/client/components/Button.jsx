import clsx from "clsx";

/**
 * Button component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - The class name for the button.
 * @param {ReactNode} props.children - The content of the button.
 * @param {...*} props.rest - Additional props for the button.
 * @returns {JSX.Element} The rendered Button component.
 */
const Button = ({ children, className, ...rest }) => (
  <button
    {...rest}
    className={clsx(
      "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600",
      className,
    )}
  >
    {children}
  </button>
);

export default Button;