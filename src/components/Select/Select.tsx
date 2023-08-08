import React, { FC } from 'react'
import clsx from 'clsx'
import { FieldWrapper } from '../FieldWrapper'
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
  const { onChange, onBlur, ref } = register(name);

  return (
    <select
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={clsx(
        'txt1 bg2',
        'placeholder:text-neutral-500/80',
        'ring-1 ring-inset ring-white/20',
        'focus:ring-2 focus:ring-inset focus:ring-teal-600',
        'block w-full rounded-md border-0 py-1.5 shadow-sm',
        'sm:text-sm sm:leading-6'
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

const Select: FC<SelectProps> = ({
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

export default Select;
