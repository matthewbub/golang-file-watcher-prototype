import { forwardRef, useState } from 'react';
import { FieldWrapper } from '../FieldWrapper';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';

const ImageUploadLarge = forwardRef(({
  name,
  label,
  placeholder,
  register,
  rows = 3,
  className,
  defaultValue,
  onChange,
}, ref) => {
  const [imagePreview, setImagePreview] = useState('');

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      console.warn("Some files were rejected:", rejectedFiles);
      // You can also show a notification to the user about the rejected files here.
    }

    const file = acceptedFiles[0];

    if (file) {
      onChange(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false, // Only allow one file to be dropped at a time.    
  });

  return (
    <FieldWrapper
      label={label}
      name={name}
      className={className}
    >
      <div className="flex items-center justify-center w-full pb-1.5">
        <label
          {...getRootProps()}
          htmlFor="dropzone-file"
          className={clsx(
            "flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer bg2 hover:bg3 dark:border-gray-600 dark:hover:border-gray-500",
            !imagePreview && "border-2 border-gray-300 border-dashed"
          )}
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="object-cover w-full h-64" />
          ) : (
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
          )}
          <input {...getInputProps()} id="dropzone-file" type="file" className="hidden" ref={ref} />
        </label>
      </div>
    </FieldWrapper>
  );
});

export default ImageUploadLarge;
