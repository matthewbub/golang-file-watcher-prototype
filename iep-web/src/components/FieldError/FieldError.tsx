import React, { FC } from 'react';

interface FieldErrorProps {
  error?: string
}

const FieldError: FC<FieldErrorProps> = ({ error }) => {
  return (
    <div className='h-4'>
      {error && error.length > 0 && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default FieldError;