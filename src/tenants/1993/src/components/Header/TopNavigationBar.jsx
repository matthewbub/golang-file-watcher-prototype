'use client'

import Link from 'next/link'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { MobileMenuButton } from '@/components/Header/MobileMenuButton'

export const TopNavigationBar = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
    <div className='flex items-center justify-between py-6 mx-auto max-w-7xl w-full'>
      <div className="flex lg:flex-1">
        <Link href="/" aria-label="Home">
          <Logo className="hidden h-8 sm:block" />
        </Link>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <div className='flex space-x-2'>
          <Button invert>Pay my invoice</Button>
          <Button>Schedule a Free Consultation</Button>
        </div>
      </div>
      <MobileMenuButton
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </div>
  )
}