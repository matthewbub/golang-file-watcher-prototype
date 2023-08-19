import React, { FC } from 'react';
import clsx from 'clsx';
import { MultiColumnFormWrapperProps } from './MultiColumnFormWrapper.interfaces';

const MultiColumnFormWrapper: FC<MultiColumnFormWrapperProps> = ({
  title,
  description,
  children,
  className,
  headingSize = "base"
}) => {
  return (
    <div className={clsx(
      "grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 mt-5 sm:px-6 md:grid-cols-3 lg:px-8",
      className
    )}>
      <div>
        {title && title.length > 0 && (
          <h2 className={clsx(
            "font-semibold leading-7 txt1",
            headingSize === "base" && "text-base",
            headingSize === "small" && "text-sm",
          )} >
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