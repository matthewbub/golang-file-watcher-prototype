import React from 'react'
import { ids, theme } from '../theme'
import clsx from 'clsx';

interface ButtonProps {
  styleType?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode | string;
  className?: string;
  onClick?: () => void;
  rest?: any;
}

export const Button: React.FC<ButtonProps> = ({
  styleType = 'primary',
  children = null,
  className = '',
  onClick = () => console.log('Button clicked'),
  ...rest
}) => {
  return (
    <button
      id={ids.buttonAlligator}
      className={clsx(`button button--${styleType}`, className)}
      {...rest}
    >
      {children}
      <style jsx>
        {`
          #${ids.buttonAlligator} {
            background-color: ${theme.buttonPrimary__backgroundColor};
            border: ${theme.buttonPrimary__border};
            border-radius: ${theme.buttonPrimary__borderRadius};
            color: ${theme.buttonPrimary__color};
            cursor: pointer;
            font-size: ${theme.buttonPrimary__fontSize};
            font-weight: ${theme.buttonPrimary__fontWeight};
            letter-spacing: ${theme.buttonPrimary__letterSpacing};
            line-height: ${theme.buttonPrimary__lineHeight};
            padding: ${theme.buttonPrimary__padding};
            text-align: ${theme.buttonPrimary__textAlign};
            text-decoration: ${theme.buttonPrimary__textDecoration};
            text-transform: ${theme.buttonPrimary__textTransform};
            transition: ${theme.buttonPrimary__transition};
            width: ${theme.buttonPrimary__width};
          }

          #${ids.buttonAlligator}:hover {
            background-color: ${theme.buttonPrimary__hover__backgroundColor};
            border: ${theme.buttonPrimary__hover__border};
            color: ${theme.buttonPrimary__hover__color};
          }

          #${ids.buttonAlligator}:active {
            background-color: ${theme.buttonPrimary__active__backgroundColor};
            border: ${theme.buttonPrimary__active__border};
            color: ${theme.buttonPrimary__active__color};
          }

          #${ids.buttonAlligator}:focus {
            background-color: ${theme.buttonPrimary__focus__backgroundColor};

            border: ${theme.buttonPrimary__focus__border};
            box-shadow: ${theme.buttonPrimary__focus__boxShadow};
            color: ${theme.buttonPrimary__focus__color};

            outline: ${theme.buttonPrimary__focus__outline};
            outline-offset: ${theme.buttonPrimary__focus__outlineOffset};

            transition: ${theme.buttonPrimary__focus__transition};
          }

          #${ids.buttonAlligator}.button--secondary {
            background-color: ${theme.buttonSecondary__backgroundColor};
            border: ${theme.buttonSecondary__border};
            border-radius: ${theme.buttonSecondary__borderRadius};
            color: ${theme.buttonSecondary__color};
            cursor: pointer;
            font-size: ${theme.buttonSecondary__fontSize};
            font-weight: ${theme.buttonSecondary__fontWeight};
            letter-spacing: ${theme.buttonSecondary__letterSpacing};
            line-height: ${theme.buttonSecondary__lineHeight};
            padding: ${theme.buttonSecondary__padding};
            text-align: ${theme.buttonSecondary__textAlign};
            text-decoration: ${theme.buttonSecondary__textDecoration};
            text-transform: ${theme.buttonSecondary__textTransform};
            transition: ${theme.buttonSecondary__transition};
            width: ${theme.buttonSecondary__width};
          }

          #${ids.buttonAlligator}.button--secondary:hover {
            background-color: ${theme.buttonSecondary__hover__backgroundColor};
            border: ${theme.buttonSecondary__hover__border};  
            color: ${theme.buttonSecondary__hover__color};
          }

          #${ids.buttonAlligator}.button--secondary:active {
            background-color: ${theme.buttonSecondary__active__backgroundColor};
            border: ${theme.buttonSecondary__active__border};
            color: ${theme.buttonSecondary__active__color};
          }

          #${ids.buttonAlligator}.button--secondary:focus {
            background-color: ${theme.buttonSecondary__focus__backgroundColor};
            border: ${theme.buttonSecondary__focus__border};
            box-shadow: ${theme.buttonSecondary__focus__boxShadow};
            color: ${theme.buttonSecondary__focus__color};
            outline: ${theme.buttonSecondary__focus__outline};
            outline-offset: ${theme.buttonSecondary__focus__outlineOffset};
            transition: ${theme.buttonSecondary__focus__transition};
          }

          #${ids.buttonAlligator}.button--tertiary {
            background-color: ${theme.buttonTertiary__backgroundColor};
            border: ${theme.buttonTertiary__border};

            border-radius: ${theme.buttonTertiary__borderRadius};
            color: ${theme.buttonTertiary__color};
            cursor: pointer;
            font-size: ${theme.buttonTertiary__fontSize};
            font-weight: ${theme.buttonTertiary__fontWeight};
            letter-spacing: ${theme.buttonTertiary__letterSpacing};
            line-height: ${theme.buttonTertiary__lineHeight};
            padding: ${theme.buttonTertiary__padding};
            text-align: ${theme.buttonTertiary__textAlign};
            text-decoration: ${theme.buttonTertiary__textDecoration};
            text-transform: ${theme.buttonTertiary__textTransform};
            transition: ${theme.buttonTertiary__transition};
            width: ${theme.buttonTertiary__width};
          }

          #${ids.buttonAlligator}.button--tertiary:hover {
            background-color: ${theme.buttonTertiary__hover__backgroundColor};
            border: ${theme.buttonTertiary__hover__border};
            color: ${theme.buttonTertiary__hover__color};
          }

          #${ids.buttonAlligator}.button--tertiary:active {
            background-color: ${theme.buttonTertiary__active__backgroundColor};
            border: ${theme.buttonTertiary__active__border};
            color: ${theme.buttonTertiary__active__color};
          }

          #${ids.buttonAlligator}.button--tertiary:focus {
            background-color: ${theme.buttonTertiary__focus__backgroundColor};
            border: ${theme.buttonTertiary__focus__border};
            box-shadow: ${theme.buttonTertiary__focus__boxShadow};
            color: ${theme.buttonTertiary__focus__color};
            outline: ${theme.buttonTertiary__focus__outline};
            outline-offset: ${theme.buttonTertiary__focus__outlineOffset};
            transition: ${theme.buttonTertiary__focus__transition};
          }
        `}
      </style>
    </button>
  )
};