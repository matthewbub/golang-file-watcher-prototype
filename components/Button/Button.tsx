import clsx from "clsx";
import { FC } from "react";

import { ButtonProps } from './Button.interfaces';

const Button: FC<ButtonProps> = ({
  children,
  className,
  styleType = 'primary',
  disabled = false,
  root = 'button',
  ...rest
}) => {
  const styleTypes = {
    primary: "bg-indigo-600 txt1",
    secondary: "bg-gray-600 txt1",
    danger: "bg-red-600 txt1",
    success: "bg-green-600 txt1",
    warning: "bg-yellow-600 txt1",
    info: "bg-blue-600 txt1",
    light: "bg-white text-gray-700",
    dark: "bg-gray-900 txt1",
  } as const;

  const stateStyles = {
    primary: "hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "hover:bg-gray-700 focus:ring-gray-500",
    danger: "hover:bg-red-700 focus:ring-red-500",
    success: "hover:bg-green-700 focus:ring-green-500",
    warning: "hover:bg-yellow-700 focus:ring-yellow-500",
    info: "hover:bg-blue-700 focus:ring-blue-500",
    light: "hover:bg-gray-50 focus:ring-gray-500",
    dark: "hover:bg-gray-800 focus:ring-gray-500",
  } as const;

  const baseStyles = "inline-flex items-center text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm" as const;

  if (root === 'a') {
    return (
      <a
        {...rest}
        className={clsx(
          disabled ? "opacity-50 cursor-not-allowed" : stateStyles[styleType],
          baseStyles,
          styleTypes[styleType],
          className
        )}
      >
        {children}
      </a>
    )
  }

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