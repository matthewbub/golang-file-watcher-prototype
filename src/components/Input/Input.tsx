import { FC } from 'react'
import clsx from 'clsx'
import { FieldWrapper } from '../../components';
import { InputProps } from './Input.interfaces';

const Input: FC<InputProps> = ({
  type = 'text',
  name,
  label,
  placeholder,
  register,
  className,
  error,
  defaultValue,
  ...rest
}) => {
  return (
    <FieldWrapper
      label={label}
      name={name}
      className={className}
    >
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={clsx(
          'text-gray-900 placeholder:text-gray-900/50',
          "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        )}
        defaultValue={defaultValue}
        {...rest}
      />
      <div className='h-3'>
        {error && error.length > 0 && <p className="text-sm text-red-400 leading-none p-0.5">{error}</p>}
      </div>
    </FieldWrapper>
  )
}

export default Input;