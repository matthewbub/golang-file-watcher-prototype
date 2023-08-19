import clsx from 'clsx';
import { StarIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

const FullNavigation = ({ navigation = [] }) => {
  return (
    <div className={clsx(
      'container-padding',
      'overflow-hidden shadow',
      'space-y-4 sm:space-y-0',
      'sm:grid sm:grid-cols-2 sm:gap-4'
    )}>
      {navigation && navigation.length > 0 && navigation.map((action) => {
        if (action.type === 'section') return (
          null
        )
        return (
          <section
            key={action.name}
            className={clsx(
              'bg2',
              'border border-transparent rounded',
              'hover:bg-transparent hover:border-teal-700',
              'group relative p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-teal-500'
            )}
          >
            <Fragment>
              <div className="h-16 w-16 flex items-center justify-center border border-neutral-700 group-hover:border-teal-700 rounded mb-5">
                <action.icon
                  className={clsx(
                    'h-8 w-8 txt2',
                    'group-hover:text-teal-500'
                  )}
                />
              </div>
              <h3 className={clsx("txt1 text-base font-semibold leading-6")}>
                <a href={action.href} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.name}
                </a>
              </h3>
              <p className={clsx("mt-2 text-sm txt2")}>
                {action.description}
              </p>
            </Fragment>

            <span
              className="absolute right-6 top-6 txt2"
              aria-hidden="true"
            >
              <StarIcon className='h-6 w-6 hover:fill-yellow-500 hover:text-yellow-500 cursor-pointer' />
            </span>

          </section>
        )
      })}
    </div>
  )
}

export default FullNavigation;
