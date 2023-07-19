import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link';

const DashboardIcon = () => (
  <svg className='fill-rose-100/70 h-5 w-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M4 2C3.44772 2 3 2.44772 3 3V13C3 13.5523 3.44772 14 4 14H10C10.5523 14 11 13.5523 11 13V3C11 2.44772 10.5523 2 10 2H4Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M14 10C13.4477 10 13 10.4477 13 11V21C13 21.5523 13.4477 22 14 22H20C20.5523 22 21 21.5523 21 21V11C21 10.4477 20.5523 10 20 10H14Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M3 17C3 16.4477 3.44772 16 4 16H10C10.5523 16 11 16.4477 11 17V21C11 21.5523 10.5523 22 10 22H4C3.44772 22 3 21.5523 3 21V17Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M14 2C13.4477 2 13 2.44772 13 3V7C13 7.55228 13.4477 8 14 8H20C20.5523 8 21 7.55228 21 7V3C21 2.44772 20.5523 2 20 2H14Z" />
  </svg>
);

const DomainsIcon = () => (
  <svg className='fill-rose-100/70 h-5 w-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.5366 4.88633C18.3096 3.7791 15.6925 3.77878 13.4652 4.88536C13.3263 4.95853 13.168 4.99994 13 4.99994C12.4477 4.99994 12 4.55222 12 3.99994C12 3.60078 12.2339 3.25624 12.5721 3.09587C15.3604 1.70926 18.6373 1.70893 21.4258 3.09487C21.7651 3.25479 22 3.59994 22 3.99994C22 4.55222 21.5523 4.99994 21 4.99994C20.8328 4.99994 20.6751 4.95889 20.5366 4.88633Z" />
    <path d="M14.5645 8.82548C16.0404 7.84718 17.9586 7.84699 19.4347 8.82493C19.5955 8.93533 19.7902 8.99994 20 8.99994C20.5523 8.99994 21 8.55222 21 7.99994C21 7.64698 20.8171 7.33672 20.541 7.15875C18.3951 5.7361 15.606 5.7359 13.46 7.15815C13.1833 7.33602 13 7.64658 13 7.99994C13 8.55222 13.4477 8.99994 14 8.99994C14.2095 8.99994 14.4039 8.93554 14.5645 8.82548Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M17 9.99994C17.5523 9.99994 18 10.4477 18 10.9999V12.1C20.2822 12.5632 22 14.581 22 16.9999C22 19.7614 19.7614 21.9999 17 21.9999H7C4.23858 21.9999 2 19.7614 2 16.9999C2 14.2385 4.23858 11.9999 7 11.9999H16V10.9999C16 10.4477 16.4477 9.99994 17 9.99994ZM7 17.9999C7.55228 17.9999 8 17.5522 8 16.9999C8 16.4477 7.55228 15.9999 7 15.9999C6.44772 15.9999 6 16.4477 6 16.9999C6 17.5522 6.44772 17.9999 7 17.9999ZM12 16.9999C12 17.5522 11.5523 17.9999 11 17.9999C10.4477 17.9999 10 17.5522 10 16.9999C10 16.4477 10.4477 15.9999 11 15.9999C11.5523 15.9999 12 16.4477 12 16.9999ZM15 17.9999C15.5523 17.9999 16 17.5522 16 16.9999C16 16.4477 15.5523 15.9999 15 15.9999C14.4477 15.9999 14 16.4477 14 16.9999C14 17.5522 14.4477 17.9999 15 17.9999Z" />
  </svg>

)

const navigation = [
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
  },
  // {
  //   name: 'Projects',
  //   icon: FolderIcon,
  //   current: false,
  //   children: [
  //     { name: 'GraphQL API', href: '#' },
  //     { name: 'iOS App', href: '#' },
  //     { name: 'Android App', href: '#' },
  //     { name: 'New Customer Portal', href: '#' },
  //   ],
  // },
  // { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  // { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
  // { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]

export const SideNavigation = () => {
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
