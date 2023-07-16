'use client'

import { useState } from 'react'
import { MobileHeader } from '@/components/Header/MobileHeader'
import { SecondaryNavigationBar } from '@/components/Header/SecondaryNavigationBar'
import { TopNavigationBar } from '@/components/Header/TopNavigationBar'


export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex flex-col">
        <TopNavigationBar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <SecondaryNavigationBar />
        <MobileHeader
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </nav>
    </header>

  )
}
