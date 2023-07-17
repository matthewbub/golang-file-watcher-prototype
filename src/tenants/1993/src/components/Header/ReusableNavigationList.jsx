'use client'

import { Fragment } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { tenantConfig } from '@/tenant.config';

export const SecondaryNavigationBar = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      {[
        { name: t('navigation.items.about'), href: tenantConfig.links['navigation.items.about'] },
        { name: t('navigation.items.services'), href: tenantConfig.links['navigation.items.services'] },
        { name: t('navigation.items.locations'), href: tenantConfig.links['navigation.items.locations'] }
      ].map((item) => (
        <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
          {item.name}
        </Link>
      ))}
    </Fragment>
  )
}
