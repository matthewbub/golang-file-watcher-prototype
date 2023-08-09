import React, { FC, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { NotificationWithActionsProps } from './NotificationWithActions.interfaces';

const NotificationWithActions: FC<NotificationWithActionsProps> = ({
  show = false,
  title,
  description,
  primaryActionLabel,
  primaryAction,
  secondaryActionLabel,
  secondaryAction,
}) => {
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-20 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-auto flex w-full max-w-md divide-x divide-white/20 rounded-lg bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="flex w-0 flex-1 items-center p-4">
              <div className="w-full">
                <p className="text-sm font-medium text-gray-100">
                  {title}
                </p>
                <p className="mt-1 text-sm text-gray-100/60">
                  {description}
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col divide-y divide-white/20">
                <div className="flex h-0 flex-1">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-none rounded-tr-lg border border-transparent px-4 py-3 text-sm font-medium text-teal-500 hover:underline focus:z-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onClick={primaryAction}
                  >
                    {primaryActionLabel}
                  </button>
                </div>
                <div className="flex h-0 flex-1">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-none rounded-br-lg border border-transparent px-4 py-3 text-sm font-medium text-gray-300 hover:underline focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onClick={secondaryAction}
                  >
                    {secondaryActionLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}

export default NotificationWithActions;
