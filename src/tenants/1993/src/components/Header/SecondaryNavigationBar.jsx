'use client'

const navigation = [
  { name: 'Our Services', href: '#' },
  { name: 'About Us', href: '#' },
  { name: 'Locations', href: '#' }
]

export const SecondaryNavigationBar = () => {
  return (
    <div className="hidden mx-auto lg:flex border-t border-b w-full items-center justify-between px-6 lg:px-8 py-2">
      <div className="flex lg:gap-x-12">
        {navigation.map((item) => (
          <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
            {item.name}
          </a>
        ))}
      </div>
    </div>
  )
}
