import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { DashboardIcon, DomainsIcon } from '9mbs/components/icons';

const fallBackNavigation = [
  { name: 'Console', href: '#', icon: DashboardIcon, current: true },
  {
    name: 'Hosting',
    icon: DomainsIcon,
    current: false,
    children: [
      { name: 'Tenants', href: '/hosting/tenants' },
      { name: 'Domains', href: '/hosting/domains' },
      { name: 'Deployments', href: '/hosting/deployments' },
    ],
  }
]

export const SideNavigation = ({ navigation = fallBackNavigation }) => {
  const activeClassName = 'bg-rose-100/10'
  const hoverClassName = 'hover:bg-rose-100/10'
  const textColorClassName = 'text-rose-100/70'
  const secondaryTextColorClassName = 'text-rose-100/50'

  return (
    <div className="h-full flex grow flex-col gap-y-5 overflow-y-auto border-r border-rose-100/40 px-6">
      <div className="flex h-16 shrink-0 items-center">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  {!item.children ? (
                    <Link
                      href={item.href}
                      className={clsx(
                        item.current ? activeClassName : hoverClassName,
                        textColorClassName,
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
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
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <a
              href="#"
              className={clsx(
                textColorClassName,
                activeClassName,
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
      </nav>
    </div>
  )
}
