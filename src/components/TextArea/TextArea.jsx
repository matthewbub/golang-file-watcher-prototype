import { forwardRef } from 'react'
import clsx from 'clsx'
import { FieldWrapper } from '../FieldWrapper'

const TextArea = forwardRef(({
  name,
  label,
  placeholder,
  register,
  rows = 3,
  className,
  defaultValue,
  value,
  ...rest
}, ref) => {
  return (
    <FieldWrapper
      label={label}
      name={name}
      className={className}
    >
      <textarea
        rows={rows}
        ref={ref}
        placeholder={placeholder}
        className={clsx(
          'txt1 bg2',
          'placeholder:text-neutral-500/80',
          'ring-1 ring-inset ring-white/20',
          'focus:ring-2 focus:ring-inset focus:ring-teal-600',
          'block w-full rounded-md border-0 py-1.5 mb-1.5 shadow-sm',
          'sm:text-sm sm:leading-6'
        )}
        defaultValue={defaultValue}
        value={value || ''}
        {...rest}
      />
    </FieldWrapper>
  )
})

export default TextArea;
