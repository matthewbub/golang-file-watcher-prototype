import FieldWrapper from './FieldWrapper'

/**
 * Select component for select fields.
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The name attribute for the select field.
 * @param {string} props.placeholder - The placeholder text for the select field.
 * @param {Function} props.register - The register function from a form library to bind the select field.
 * @param {Array} [props.options=[]] - The options for the select field.
 * @param {...*} props.rest - Additional props for the select field.
 * @returns {JSX.Element} The rendered Input component.
 */
export default function Select({
  name,
  placeholder,
  register,
  options = [],
  label,
  ...rest
}) {
  return (
    <FieldWrapper name={name} label={label}>
      <select
        {...register(name)}
        placeholder={placeholder}
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        {...rest}
      >
        {options && options.length > 0 && options.map((option) => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>
    </FieldWrapper>
  )
}
