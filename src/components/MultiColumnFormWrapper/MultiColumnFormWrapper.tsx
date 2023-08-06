import React, { FC } from 'react';
import { MultiColumnFormWrapperProps } from './MultiColumnFormWrapper.interfaces';

const MultiColumnFormWrapper: FC<MultiColumnFormWrapperProps> = ({ title, description, children }) => {
  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        {title && title.length > 0 && (
          <h2 className="text-base font-semibold leading-7 txt1" >
            {title}
          </h2>
        )}
        {description && description.length > 0 && (
          <p className="mt-1 text-sm leading-6 text-gray-400">
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  )
}

export default MultiColumnFormWrapper;