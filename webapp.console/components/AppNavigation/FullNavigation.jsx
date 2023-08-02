import clsx from 'clsx'
import { baseClassNames } from '../../helpers/constants'

export const FullNavigation = ({ navigation = [] }) => {
  return (
    <div className={clsx("overflow-hidden shadow sm:grid sm:grid-cols-2 sm:gap-4 space-y-4 sm:space-y-0")}>
      {navigation && navigation.length > 0 && navigation.map((action) => {
        if (action.type === 'section') return (
          null
        )
        return (
          <div
            key={action.name}
            className={clsx(
              baseClassNames.secondaryBackground,
              baseClassNames.secondaryBackgroundHover,
              'rounded',
              'group relative p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
            )}
          >
            <div className="">
              <h3 className={clsx(
                baseClassNames.text,
                "text-base font-semibold leading-6"
              )}>
                <a href={action.href} className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.name}
                </a>
              </h3>
              <p className={clsx(
                "mt-2 text-sm",
                baseClassNames.secondaryText
              )}>
                {action.description}
              </p>
            </div>
            <span
              className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>

          </div>
        )
      })}
    </div>
  )
}
