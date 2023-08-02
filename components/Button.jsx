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
const Button = ({ children, className, styleType = 'primary', ...rest }) => {
  const styleTypes = {
    primary: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white",
    danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white",
    success: "bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white",
    warning: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 text-white",
    info: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white",
    light: "bg-white hover:bg-gray-50 focus:ring-gray-500 text-gray-700",
    dark: "bg-gray-900 hover:bg-gray-800 focus:ring-gray-500 text-white",
  };

  return (
    <button
      {...rest}
      className={clsx(
        styleTypes[styleType],
        "inline-flex items-center text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
        className,
      )}
    >
      {children}
    </button>
  )
};

export default Button;