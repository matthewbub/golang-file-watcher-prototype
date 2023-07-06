'use client';

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BellIcon, UserIcon } from '@heroicons/react/24/outline'
import { appConfig } from '../config/appConfig'
import clsx from 'clsx'
import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link';
import { DashboardSideNavigation } from './DashboardSideNavigation';

function Navigation() {
  return (
    <nav className="flex flex-1 flex-col" aria-label="Sidebar">
      <ul role="list" className="-mx-2 space-y-1">
        {appConfig.navigation.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className={clsx(
                item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                'group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold'
              )}
            >
              {item.name}
              {item.count ? (
                <span
                  className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
                  aria-hidden="true"
                >
                  {item.count}
                </span>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function DashboardLayout({
  mainContent,
  secondaryContent
}) {
  const { user, loading } = useUser();
  const messages = {
    viewNotifications: appConfig['Dashboard-Layout.Sr-Only.View-Notifications'],
    account: appConfig['Dashboard-Layout.Sr-Only.Account'],
    currentUsernameLabel: appConfig['Dashboard-Layout.Label.Current-Username'],
    accountSettingsLabel: appConfig['Dashboard-Layout.Label.Account-Settings'],
    supportLabel: appConfig['Dashboard-Layout.Label.Support'],
    licenseLabel: appConfig['Dashboard-Layout.Label.License'],
    logOutLabel: appConfig['Dashboard-Layout.Label.Log-out'],
  }

  return (
    <div className="flex min-h-full flex-col">
      <header className="shrink-0 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <img
            className="h-8 w-auto"
            src={appConfig.logo.src}
            alt={appConfig.logo.alt}
          />
          <div className="flex items-center gap-x-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
              <span className="sr-only">{messages.viewNotifications}</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">{messages.account}</span>
                    <UserIcon className="h-6 w-6" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-3">
                      <p className="text-sm">{messages.currentUsernameLabel}</p>
                      {user.name && !loading && (
                        <p className="truncate text-sm font-medium text-gray-900">{user.name}</p>
                      )}
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {messages.accountSettingsLabel}
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {messages.supportLabel}
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {messages.licenseLabel}
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <form method="POST" action="#">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/api/auth/logout"
                              className={clsx(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block w-full px-4 py-2 text-left text-sm'
                              )}
                            >
                              {messages.logOutLabel}
                            </Link>
                          )}
                        </Menu.Item>
                      </form>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
        <aside className="sticky top-8 hidden w-44 shrink-0 lg:block">
          <DashboardSideNavigation />
        </aside>

        {typeof mainContent === 'function' && (
          <main className="flex-1">
            {mainContent()}
          </main>
        )}

        {typeof secondaryContent === 'function' && (
          <aside className="sticky top-8 hidden w-96 shrink-0 xl:block">
            {secondaryContent()}
          </aside>
        )}
      </div>
    </div>
  )
}
