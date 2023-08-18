import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Bars3Icon, MagnifyingGlassIcon, HomeIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx';
import { SideNavigation } from '../SideNavigation';
import { consoleNavigation as fallBackNavigation } from '../../constants';
import { NotificationWithActions } from '../NotificationWithActions';
import { useSessionStore } from '../../stores/session.store';
import { AppNavigation } from '../AppNavigation';

const PublicDocsLayout = ({
  primary,
  secondary = null,
  primaryTitle,
  secondaryTitle = null,
  navigation = fallBackNavigation,
  primaryAction = null,
  breadcrumbs,
  primaryTitleDescription = null
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loadingSessionRenewal, setLoadingSessionRenewal] = useState(false);
  const [sessionTimeoutNotification, setSessionTimeoutNotification] = useState(false);
  const { session } = useSessionStore();
  const router = useRouter();

  return (
    <Fragment>
      <div className='min-h-screen bg-neutral-950'>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 xl:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-neutral-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 txt1" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-neutral-900 px-6 ring-1 ring-white/10">
                    <SideNavigation navigation={navigation} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
          <SideNavigation navigation={navigation} />
        </div>

        <div className="xl:pl-72">

          <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/20 bg-neutral-900 px-4 shadow-sm sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 txt1 xl:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </button>


            <AppNavigation />

          </div>

          <main className={clsx(secondary && "lg:pr-96")}>
            <nav className="flex border-b bg-neutral-950 border-white/20" aria-label="Breadcrumb">
              <ol role="list" className="mx-auto flex w-full space-x-4 px-4 sm:px-6 lg:px-8">
                <li className="flex h-11">
                  <div className="flex items-center">
                    <a href="/" className="a1">
                      <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                      <span className="sr-only">Home</span>
                    </a>
                  </div>
                </li>
                {breadcrumbs && breadcrumbs.length > 0 && breadcrumbs.map((page) => (
                  <li key={page.name} className="flex">
                    <div className="flex items-center">
                      <svg
                        className="h-full w-6 flex-shrink-0 text-white/20"
                        viewBox="0 0 24 44"
                        preserveAspectRatio="none"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                      </svg>
                      <a
                        href={page.href || '#'}
                        className="ml-4 text-sm font-medium a1"
                        aria-current={page.current ? 'page' : undefined}
                      >
                        {page.name}
                      </a>
                    </div>
                  </li>
                ))}
              </ol>
            </nav>

            <header className="flex items-center justify-between border-b border-white/20 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <div className="px-4 sm:px-0">
                {primaryTitle && primaryTitle.length > 0 && (<h1 className="text-base font-semibold leading-7 txt1" >{primaryTitle}</h1>)}
                {primaryTitleDescription && primaryTitleDescription.length > 0 && (<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-400">{primaryTitleDescription}</p>)}
              </div>
              {primaryAction &&
                <div className="px-4 sm:px-0">
                  {primaryAction()}
                </div>
              }
            </header>
            <section className="">
              {primary()}
            </section>

          </main>


          {secondary && (
            <aside className="bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/20">
              {
                secondaryTitle && secondaryTitle.length > 0 && (
                  <header className="flex items-center justify-between border-b border-white/20 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                    <h2 className="text-base font-semibold leading-7 txt1 block mb-5" >{secondaryTitle}</h2>
                  </header>

                )
              }

              {secondary()}
            </aside>
          )}
        </div>
      </div >
      {/* <NotificationWithActions
        show={sessionTimeoutNotification}
        title="Inactivity timeout warning"
        description={session?.expires}
        primaryActionLabel={loadingSessionRenewal ? 'Loading...' : 'Renew session'}
        primaryAction={async () => {
          setLoadingSessionRenewal(true);
          const response = await fetch('/api/v1/secure/renew-session/console');
          const data = await response.json();
          if (data.ok) {
            setSessionTimeoutNotification(false);
            setLoadingSessionRenewal(false);
          }
          setSessionTimeoutNotification(false);
          setLoadingSessionRenewal(false);
        }}
        secondaryActionLabel='Sign out'
        secondaryAction={async () => {
          const response = await fetch('/api/v1/log-out');
          const data = await response.json();
          if (data.ok) {
            setSessionTimeoutNotification(false);
            router.push('/log-in');
          }
        }}
      /> */}
    </Fragment>
  )
}

export default PublicDocsLayout;