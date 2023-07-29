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
  <button {...rest} className='UCAN2-button'>
    {children}
  </button>
);

export default Button;