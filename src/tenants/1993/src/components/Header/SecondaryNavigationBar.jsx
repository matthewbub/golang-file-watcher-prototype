'use client'

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { tenantConfig } from '@/tenant.config';
export const SecondaryNavigationBar = () => {
  const { t } = useTranslation();
  return (
    <div className="hidden mx-auto lg:flex border-t border-b w-full items-center justify-between px-6 lg:px-8 py-2">
      <div className="flex lg:gap-x-12 mx-auto max-w-7xl w-full">
        {[
          { name: t('navigation.items.about'), href: tenantConfig.links['navigation.items.about'] },
          { name: t('navigation.items.services'), href: tenantConfig.links['navigation.items.services'] },
          { name: t('navigation.items.locations'), href: tenantConfig.links['navigation.items.locations'] }
        ].map((item) => (
          <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
