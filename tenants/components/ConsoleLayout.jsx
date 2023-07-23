import { SideNavigation, navigation as fallBackNavigation } from './AppNavigation';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx';
import { HomeIcon } from '@heroicons/react/20/solid'
import { AuthWrapper } from './AuthWrapper';

const pages = [
  { name: 'Projects', href: '#', current: false },
  { name: 'Project Nero', href: '#', current: true },
]

export const ConsoleLayout = ({
  primary,
  secondary = null,
  primaryTitle,
  secondaryTitle,
  navigation = fallBackNavigation,
  primaryAction = null,
  breadcrumbs = pages,
  primaryTitleDescription = null
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AuthWrapper>
      <div className='min-h-screen bg-gray-950'>
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
              <div className="fixed inset-0 bg-gray-900/80" />
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
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
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
          {/* Sticky search header */}
          <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-white xl:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <input
                    id="search-field"
                    className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
          </div>

          <main className={clsx(secondary && "lg:pr-96")}>
            <nav className="flex border-b bg-gray-950 border-white/5" aria-label="Breadcrumb">
              <ol role="list" className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
                <li className="flex h-11">
                  <div className="flex items-center">
                    <a href="/" className="text-gray-400 hover:text-gray-500">
                      <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                      <span className="sr-only">Home</span>
                    </a>
                  </div>
                </li>
                {breadcrumbs && breadcrumbs.length > 0 && breadcrumbs.map((page) => (
                  <li key={page.name} className="flex">
                    <div className="flex items-center">
                      <svg
                        className="h-full w-6 flex-shrink-0 text-white/5"
                        viewBox="0 0 24 44"
                        preserveAspectRatio="none"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                      </svg>
                      <a
                        href={page.href}
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                        aria-current={page.current ? 'page' : undefined}
                      >
                        {page.name}
                      </a>
                    </div>
                  </li>
                ))}
              </ol>
            </nav>

            <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <div className="px-4 sm:px-0">
                {primaryTitle && primaryTitle.length > 0 && (<h1 className="text-base font-semibold leading-7 text-white">{primaryTitle}</h1>)}
                {primaryTitleDescription && primaryTitleDescription.length > 0 && (<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-400">{primaryTitleDescription}</p>)}
              </div>
              {primaryAction &&
                <div className="px-4 sm:px-0">
                  primaryAction()
                </div>
              }
            </header>
            <section className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              {primary()}
            </section>

          </main>


          {secondary && (
            <aside className="bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
              <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                {(secondaryTitle && secondaryTitle.length > 0 && <h2 className="text-base font-semibold leading-7 text-white">{secondaryTitle}</h2>)}
                {/* <a href="#" className="text-sm font-semibold leading-6 text-indigo-400">
                  View all
                </a> */}
              </header>

              {secondary()}
            </aside>
          )}
        </div>
      </div>
    </AuthWrapper>
  )
}
