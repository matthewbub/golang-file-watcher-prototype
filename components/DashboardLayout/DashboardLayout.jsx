'use client';

import { BellIcon } from '@heroicons/react/24/outline'
import { appConfig } from '../../config/appConfig'
import { DashboardSideNavigation } from '../DashboardSideNavigation';
import { UserAccountDropMenu } from '../UserAccountDropMenu';

export default function DashboardLayout({
  mainContent,
  secondaryContent
}) {
  const messages = {
    viewNotifications: appConfig['DashboardLayout.Sr-Only.View-Notifications']
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
              <UserAccountDropMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
        <aside className="sticky top-8 hidden w-44 shrink-0 lg:block">
          <DashboardSideNavigation current={'/dashboard'} />
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
