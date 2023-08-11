import { forwardRef } from 'react'
import clsx from 'clsx'
import { FieldWrapper } from '../FieldWrapper'

const ImageUploadLarge = forwardRef(({
  name,
  label,
  placeholder,
  register,
  rows = 3,
  className,
  defaultValue,
  ...rest
}, ref) => {
  return (
    <FieldWrapper
      label={label}
      name={name}
      className={className}
    >
      <div className="flex items-center justify-center w-full pb-1.5">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg2 hover:bg3 dark:border-gray-600 dark:hover:border-gray-500 "
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" ref={ref} />
        </label>
      </div>

      {/* <textarea
        rows={rows}
        ref={ref}
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
      /> */}
    </FieldWrapper>
  )
})

export default ImageUploadLarge;
