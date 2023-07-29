import { useState } from 'react'
import SideNavigation from './components/SideNavigation'
import logo from './assets/dark_logo_9thstreet.svg'
// import { HomeIcon, UsersIcon } from '@heroicons/react/outline'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='mx-auto px-4 md:px-6 lg:px-9'>
      <SideNavigation
        logo={logo}
        navigation={[
          { name: 'Dashboard', href: '#', current: true },
          {
            name: 'Locales',
            // icon: UsersIcon,
            current: false,
            children: [
              { name: 'View all', href: '/locales' },
              { name: 'API', href: '#' },
            ],
          },
        ]}
      />
    </div>
  )
}

export default App
