'use client';

import { Fragment, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon, ExclamationTriangleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useAtom } from 'jotai';
import { notifications } from '../../stores/jotai';

const Notifications = () => {
  const [appNotifications, setAppNotifications] = useAtom(notifications);

  // only display the 4 most recent notifications
  // to avoid cluttering the UI
  const displayedNotifications = appNotifications.slice(-4);

  const closeNotification = (id) => {
    setAppNotifications(appNotifications.filter((n) => n.id !== id));
  }

  useEffect(() => {
    const closeNotificationAfterDuration = (notification) => {
      setTimeout(() => {
        closeNotification(notification.id);
      }, notification.duration);
    };

    // Close notifications after their duration has passed
    // TODO: Research - This might be bugged out when the user has multiple notifications pile up
    appNotifications.forEach((notification) => {
      closeNotificationAfterDuration(notification);
    });
  }, [appNotifications])

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 px-4 py-6 sm:items-start sm:p-6 flex flex-col space-y-2 items-end"
    >
      {appNotifications && appNotifications.length > 0 && displayedNotifications.map((notification) => (
        <div
          key={notification.id}
          className="flex w-full flex-col items-center space-y-4 sm:items-end"
        >
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={notification.show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {notification.type === 'success' && <CheckCircleIcon className="h-6 w-6 text-green-500" aria-hidden="true" />}
                    {notification.type === 'error' && <ExclamationTriangleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />}
                    {notification.type === 'warning' && <ExclamationCircleIcon className="h-6 w-6 text-orange-500" aria-hidden="true" />}
                    {notification.type === 'info' && <InformationCircleIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={closeNotification}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      ))}
    </div >
  )
}

export default Notifications;