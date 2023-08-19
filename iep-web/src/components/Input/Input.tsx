import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { FieldWrapper } from '../../components';
import { InputProps } from './Input.interfaces';

interface ForwardedInputProps extends InputProps {
  ref?: React.Ref<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, ForwardedInputProps>(({
  type = 'text',
  name,
  label,
  placeholder,
  className,
  error,
  defaultValue,
  onChange,
  value,
  ...rest
}, ref) => {
  return (
    <FieldWrapper
      label={label}
      name={name}
      className={className}
    >
      <input
        ref={ref}
        type={type}
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
        onChange={onChange}
        value={value || ''}
        {...rest}
      />
      <div className='h-3'>
        {error && error.length > 0 && <p className="text-sm text-red-400 leading-none p-0.5">{error}</p>}
      </div>
    </FieldWrapper>
  )
})

export default Input;
