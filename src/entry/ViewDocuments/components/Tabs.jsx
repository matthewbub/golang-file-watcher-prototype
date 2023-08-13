import React from 'react';
import clsx from 'clsx';

const Tabs = () => {
  const tabs = [
    { name: 'Stats', href: '#', current: true },
    { name: 'Edit', href: '#', current: false },
  ]
  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 mt-5 sm:px-6 md:grid-cols-3 lg:px-8">
      <nav className="flex space-x-4" aria-label="Tabs">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            className={clsx(
              tab.current ? 'bg-teal-100/50 text-white outline outline-teal-500' : 'text-gray-500 hover:text-gray-700',
              'px-3 py-0.5 text-sm font-medium'
            )}
            aria-current={tab.current ? 'page' : undefined}
          >
            {tab.name}
          </a>
        ))}
      </nav>
    </div>

  )
}

export default Tabs;