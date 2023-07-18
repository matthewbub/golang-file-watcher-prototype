/**
 * Wrapper component for form fields.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the field.
 * @param {string} props.name - The name attribute for the field.
 * @param {ReactNode} props.children - The content of the field.
 * @param {...*} props.rest - Additional props for the wrapper
 * @returns {JSX.Element} The rendered FieldWrapper component.
 */
const FieldWrapper = ({ label, name, children, ...rest }) => (
  <div {...rest}>
    {label && label.length && (
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
    )}
    <div className="mt-2">
      {children}
    </div>
  </div>
)

export default FieldWrapper;