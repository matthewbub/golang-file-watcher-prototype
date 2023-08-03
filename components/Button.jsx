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
const Button = ({
  children,
  className,
  styleType = 'primary',
  disabled = false,
  ...rest
}) => {
  const styleTypes = {
    primary: "bg-indigo-600 text-white",
    secondary: "bg-gray-600 text-white",
    danger: "bg-red-600 text-white",
    success: "bg-green-600 text-white",
    warning: "bg-yellow-600 text-white",
    info: "bg-blue-600 text-white",
    light: "bg-white text-gray-700",
    dark: "bg-gray-900 text-white",
  };

  const stateStyles = {
    primary: "hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "hover:bg-gray-700 focus:ring-gray-500",
    danger: "hover:bg-red-700 focus:ring-red-500",
    success: "hover:bg-green-700 focus:ring-green-500",
    warning: "hover:bg-yellow-700 focus:ring-yellow-500",
    info: "hover:bg-blue-700 focus:ring-blue-500",
    light: "hover:bg-gray-50 focus:ring-gray-500",
    dark: "hover:bg-gray-800 focus:ring-gray-500",
  };

  const baseStyles = "inline-flex items-center text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm"

  return (
    <button
      {...rest}
      className={clsx(
        disabled ? "opacity-50 cursor-not-allowed" : stateStyles[styleType],
        baseStyles,
        styleTypes[styleType],
        className
      )}
    >
      {children}
    </button>
  )
};

export default Button;