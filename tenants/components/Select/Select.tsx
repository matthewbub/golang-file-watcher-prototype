import { FC } from 'react'
import clsx from 'clsx'
import FieldWrapper from '../FieldWrapper'
import { FieldError } from '../FieldError'
import { FieldSelectProps, SelectProps } from './Select.interfaces'

const FieldSelect: FC<FieldSelectProps> = ({
  name,
  register,
  options = [],
  placeholder,
  ariaLabel,
  ...rest
}) => {
  return (
    <select
      name={name}
      {...register(name)}
      placeholder={placeholder}
      className={clsx(
        "rounded-md w-full border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      )}
      aria-label={ariaLabel}
      {...rest}
    >
      {options && options.length > 0 && options.map((option) => (
        <option key={option.id} value={option.id}>{option.name}</option>
      ))}
    </select>
  )
}

export const Select: FC<SelectProps> = ({
  name,
  placeholder,
  register,
  options = [],
  label = '',
  className = '',
  error,
  ...rest
}) => {
  return (
    <FieldWrapper
      name={name}
      label={label}
      className={className}
    >
      <FieldSelect
        name={name}
        placeholder={placeholder}
        register={register}
        options={options}
        ariaLabel={name}
        {...rest}
      />
      <FieldError
        error={error}
      />
    </FieldWrapper>
  )
}
