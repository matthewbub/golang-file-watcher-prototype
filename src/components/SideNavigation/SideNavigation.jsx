import { Fragment } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

const SideNavigation = ({ navigation = [] }) => {
  const activeClassName = 'bg-white/10'
  const hoverClassName = 'hover:bg-white/10'
  const textColorClassName = 'text-white/70'
  const secondaryTextColorClassName = 'text-white-100/50'

  return (
    <div className="h-full flex grow flex-col gap-y-5 overflow-y-auto px-6 border-r border-white/20">
      <div className="flex h-16 shrink-0 items-center">
        <img
          className="h-10 w-auto"
          src="https://bhoyxrelzzohrygasyjt.supabase.co/storage/v1/object/public/public/logo.png"
          alt="NineMbs Studio"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation && navigation.length > 0 && navigation.map((item, index) => (
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
                      {!item.children ? (
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
                      ) : (
                        <Disclosure as="div">
                          {({ open }) => (
                            <>
                              <Disclosure.Button
                                className={clsx(
                                  item.current ? activeClassName : hoverClassName,
                                  textColorClassName,
                                  'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold'
                                )}
                              >
                                <item.icon className={clsx("h-6 w-6 shrink-0", textColorClassName)} aria-hidden="true" />
                                {item.name}
                                <ChevronRightIcon
                                  className={clsx(
                                    open ? 'rotate-90 text-gray-500' : 'text-gray-400',
                                    'ml-auto h-5 w-5 shrink-0'
                                  )}
                                  aria-hidden="true"
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel as="ul" className="mt-1 px-2">
                                {item.children.map((subItem) => (
                                  <li key={subItem.name}>
                                    {/* 44px */}
                                    <Disclosure.Button
                                      as="a"
                                      href={subItem.href}
                                      className={clsx(
                                        subItem.current ? activeClassName : hoverClassName,
                                        secondaryTextColorClassName,
                                        'block rounded-md py-2 pr-2 pl-9 text-sm leading-6'
                                      )}
                                    >
                                      {subItem.name}
                                    </Disclosure.Button>
                                  </li>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      )}
                    </li >
                  )}
                </Fragment>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <a
              href="/settings"
              className={clsx(
                textColorClassName,
                // activeClassName,
                "flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6"
              )}
            >
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Tom Cook</span>
            </a>
          </li>
        </ul>
      </nav >
    </div >
  )
}

export default SideNavigation;
