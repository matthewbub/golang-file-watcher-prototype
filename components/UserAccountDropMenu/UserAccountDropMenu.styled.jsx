'use client';

import React from 'react';
import { Fragment, forwardRef } from 'react';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';

export const StyledMenu = forwardRef(({ children, ...rest }, ref) => (
  <Menu as="div" className="relative inline-block text-left" ref={ref} {...rest}>
    {children}
  </Menu>
));

export const StyledMenuButton = forwardRef(({ children, ...rest }, ref) => (
  <Menu.Button className="-m-2 p-2 text-gray-400 hover:text-gray-500" ref={ref} {...rest}>
    {children}
  </Menu.Button>
));

export const StyledTransition = forwardRef(({ children, ...rest }, ref) => (
  <Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
    ref={ref}
    {...rest}
  >
    {children}
  </Transition>
));

export const StyledMenuItems = forwardRef(({ children, ...rest }, ref) => (
  <Menu.Items
    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    ref={ref}
    {...rest}
  >
    {children}
  </Menu.Items>
));

export const StyledMenuText = ({ children, ...rest }) => (
  <p className="text-sm" {...rest}>
    {children}
  </p>
);

export const StyledMenuItem = forwardRef(({ children, ...rest }, ref) => (
  <Menu.Item ref={ref}>
    {({ active }) => (
      <Link
        className={clsx(
          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
          'block px-4 py-2 text-sm'
        )}
        {...rest}
      >
        {children}
      </Link>
    )}
  </Menu.Item>
));

export const StyledLogoutLink = forwardRef(({ children, ...rest }, ref) => (
  <Menu.Item ref={ref}>
    {({ active }) => (
      <Link
        href="/api/auth/logout"
        className={clsx(
          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
          'block w-full px-4 py-2 text-left text-sm'
        )}
        {...rest}
      >
        {children}
      </Link>
    )}
  </Menu.Item>
));