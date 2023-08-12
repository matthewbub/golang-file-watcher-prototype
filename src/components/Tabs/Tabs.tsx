import React, { FC } from 'react';
import clsx from 'clsx';
import { TabsProps, TabAsLinkProps, TabAsButtonProps } from './Tabs.interfaces';

const TabAsLink: FC<TabAsLinkProps> = ({ label, href, current }) => {
  return (
    <a
      key={label}
      href={href}
      className={clsx(
        current ? 'bg-teal-100/50 text-white outline outline-teal-500' : 'text-gray-500 hover:text-gray-700',
        'px-3 py-0.5 text-sm font-medium'
      )}
      aria-current={current ? 'page' : undefined}
    >
      {label}
    </a>
  )
}

const TabAsButton: FC<TabAsButtonProps> = ({ label, onClick, current }) => {
  return (
    <button
      onClick={onClick}
      key={label}
      className={clsx(
        current ? 'bg-teal-100/50 text-white outline outline-teal-500' : 'text-gray-500 hover:text-gray-700',
        'px-3 py-0.5 text-sm font-medium'
      )}
      aria-current={current ? 'page' : undefined}
    >
      {label}
    </button>
  )
}

const Tabs: FC<TabsProps> = ({ tabs }) => {
  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 mt-5 sm:px-6 md:grid-cols-3 lg:px-8">
      <nav className="flex space-x-4" aria-label="Tabs">
        {tabs.map((tab) => {
          if (tab.as === 'a' && 'href' in tab) {
            return <TabAsLink key={tab.label} label={tab.label} href={tab.href} current={tab.current} />
          } else if (tab.as === 'button' && 'onClick' in tab) {
            return <TabAsButton key={tab.label} label={tab.label} onClick={tab.onClick} current={tab.current} />
          }
          return null; // This is a fallback in case neither condition is met, though it shouldn't happen.
        })}
      </nav>
    </div>
  )
}

export default Tabs;