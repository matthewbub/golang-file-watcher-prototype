import clsx from 'clsx';
import Link from 'next/link';

export const StyledDashboardLayoutNav = ({ children, ...rest }) => (
  <nav className="flex flex-1 flex-col" aria-label="Sidebar" {...rest}>{children}</nav>
);

export const StyledDashboardLayoutList = ({ children, ...rest }) => (
  <ul role="list" className="-mx-2 space-y-1" {...rest}>{children}</ul>
);

export const StyledDashboardLayoutItem = ({ item, ...rest }) => (
  <li key={item.name} {...rest}>
    <StyledDashboardLayoutLink item={item} />
  </li>
);

export const StyledDashboardLayoutLink = ({ item, ...rest }) => (
  <Link
    href={item.href}
    className={clsx(
      item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
      'group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold'
    )}
    {...rest}
  >
    {item.name}
    {item.count ? (
      <StyledDashboardLayoutCount count={item.count} />
    ) : null}
  </Link>
);

export const StyledDashboardLayoutCount = ({ count, ...rest }) => (
  <span
    className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
    aria-hidden="true"
    {...rest}
  >
    {count}
  </span>
);
