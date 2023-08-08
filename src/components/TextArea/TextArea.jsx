import { FieldWrapper } from '../FieldWrapper'
import clsx from 'clsx'
/**
 * Input component for form fields.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.type='text'] - The type of the input field.
 * @param {string} props.name - The name attribute for the input field.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {number} props.rows - The number of rows for the textarea.
 * @param {Function} props.register - The register function from a form library to bind the input field.
 * @returns {JSX.Element} The rendered Input component.
 */
const TextArea = ({
  name,
  label,
  placeholder,
  register,
  rows = 3,
  className,
  defaultValue,
  ...rest
}) => {
  return (
    <FieldWrapper
      label={label}
      name={name}
      className={className}
    >
      <textarea
        rows={rows}
        {...register(name)}
        placeholder={placeholder}
        className={clsx(
          'txt1 bg2',
          'placeholder:text-neutral-500/80',
          'ring-1 ring-inset ring-white/20',
          'focus:ring-2 focus:ring-inset focus:ring-teal-600',
          'block w-full rounded-md border-0 py-1.5 shadow-sm',
          'sm:text-sm sm:leading-6'
        )}
        defaultValue={defaultValue}
        {...rest}
      />
    </FieldWrapper>
  )
}

export default TextArea;
