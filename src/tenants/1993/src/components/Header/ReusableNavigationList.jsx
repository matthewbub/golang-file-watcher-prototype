'use client'

import { Fragment } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { tenantConfig } from '@/tenant.config';

export const ReusableNavigationList = () => {
  const { t } = useTranslation();
  const links = tenantConfig.links;
  const ignore = tenantConfig.ignore;
  return (
    <Fragment>
      {[
        { name: t('navigation.items.home'), href: links['navigation.items.home'], ignore: ignore['navigation.items.home'] },
        { name: t('navigation.items.about'), href: links['navigation.items.about'], ignore: ignore['navigation.items.about'] },
        { name: t('navigation.items.services'), href: links['navigation.items.services'], ignore: ignore['navigation.items.services'] },
        { name: t('navigation.items.locations'), href: links['navigation.items.locations'], ignore: ignore['navigation.items.locations'] }
      ].map((item) => {
        if (item.ignore) {
          return null;
        }

        return (
          <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
            {item.name}
          </Link>
        )
      })}
    </Fragment>
  )
}
