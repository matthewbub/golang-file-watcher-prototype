import { Fragment } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useWindowDimensions } from '../../helpers';
import { consoleNavigation, consoleHeaderNavigation } from '../../constants';

const SideNavigation = ({ navigation = [] }) => {
  const { width } = useWindowDimensions();

  const safeNav = width < 1280 ? (
    [
      ...consoleNavigation,
      ...consoleHeaderNavigation
    ]
  ) : consoleNavigation

  const activeClassName = 'bg-teal-700 text-white'
  const hoverClassName = 'hover:bg-teal-700'
  const textColorClassName = 'text-white/70'

  return (
    <div className="h-full flex grow flex-col gap-y-5 overflow-y-auto px-6 xl:border-r xl:border-white/20">
      <div className="flex h-16 shrink-0 items-center">
        <img
          className="h-10 w-auto"
          src="https://bhoyxrelzzohrygasyjt.supabase.co/storage/v1/object/public/public/logo.png"
          alt="NineMbs Studio"
        />
      </div>
      <nav className="flex flex-1 flex-col">

        <ul role="list" className="-mx-2 space-y-1">
          {safeNav.map((item, index) => (
            <Fragment key={index}>
              {item.type === 'section' ? (
                <li className={clsx(index !== 0 && 'mt-8')}>
                  <div className={clsx(
                    index !== 0 && 'mt-8',
                    "flex items-center text-xs text-teal-600 uppercase tracking-wider mb-4 font-bold"
                  )}>
                    {item.name}
                  </div>
                </li>
              ) : (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={clsx(
                      item.current ? activeClassName : hoverClassName,
                      textColorClassName,
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6'
                    )}
                  >
                    <item.icon className={clsx("h-6 w-6 shrink-0", textColorClassName)} aria-hidden="true" />
                    {item.name}
                  </Link>
                </li >
              )}
            </Fragment>
          ))}
        </ul>
      </nav>
    </div >
  )
}

export default SideNavigation;
