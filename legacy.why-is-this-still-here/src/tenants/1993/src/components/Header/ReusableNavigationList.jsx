'use client'

import { Fragment } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { DropDownItem } from '@/components/Header/DropDownItem';
import { tenantConfig } from '@/tenant.config';

export const ReusableNavigationList = () => {
  const { t } = useTranslation();
  const links = tenantConfig.links;
  const ignore = tenantConfig.ignore;
  const aboutSubLinks = {
    ignore: ignore['navigation.items.about.sublinks.ignoreall'],
    links: [
      { name: t('navigation.items.about.sublink.1'), href: links['navigation.items.about.sublink.1'], ignore: ignore['navigation.items.sublink.1'] },
      { name: t('navigation.items.about.sublink.2'), href: links['navigation.items.about.sublink.2'], ignore: ignore['navigation.items.sublink.2'] },
      { name: t('navigation.items.about.sublink.3'), href: links['navigation.items.about.sublink.3'], ignore: ignore['navigation.items.sublink.3'] },
      { name: t('navigation.items.about.sublink.4'), href: links['navigation.items.about.sublink.4'], ignore: ignore['navigation.items.sublink.4'] },
    ]
  }
  const servicesSubLinks = {
    ignore: ignore['navigation.items.services.sublinks.ignoreall'],
    links: [
      { name: t('navigation.items.services.sublink.1'), href: links['navigation.items.services.sublink.1'], ignore: ignore['navigation.items.sublink.1'] },
      { name: t('navigation.items.services.sublink.2'), href: links['navigation.items.services.sublink.2'], ignore: ignore['navigation.items.sublink.2'] },
      { name: t('navigation.items.services.sublink.3'), href: links['navigation.items.services.sublink.3'], ignore: ignore['navigation.items.sublink.3'] },
      { name: t('navigation.items.services.sublink.4'), href: links['navigation.items.services.sublink.4'], ignore: ignore['navigation.items.sublink.4'] },
    ]
  }
  const locationsSubLinks = {
    ignore: ignore['navigation.items.locations.sublinks.ignoreall'],
    links: [
      { name: t('navigation.items.locations.sublink.1'), href: links['navigation.items.locations.sublink.1'], ignore: ignore['navigation.items.sublink.1'] },
      { name: t('navigation.items.locations.sublink.2'), href: links['navigation.items.locations.sublink.2'], ignore: ignore['navigation.items.sublink.2'] },
      { name: t('navigation.items.locations.sublink.3'), href: links['navigation.items.locations.sublink.3'], ignore: ignore['navigation.items.sublink.3'] },
      { name: t('navigation.items.locations.sublink.4'), href: links['navigation.items.locations.sublink.4'], ignore: ignore['navigation.items.sublink.4'] },
    ]
  }
  return (
    <Fragment>
      {[
        { name: t('navigation.items.home'), href: links['navigation.items.home'], ignore: ignore['navigation.items.home'] },
        { name: t('navigation.items.about'), href: links['navigation.items.about'], ignore: ignore['navigation.items.about'], subLinks: aboutSubLinks },
        { name: t('navigation.items.services'), href: links['navigation.items.services'], ignore: ignore['navigation.items.services'], subLinks: servicesSubLinks },
        { name: t('navigation.items.locations'), href: links['navigation.items.locations'], ignore: ignore['navigation.items.locations'], subLinks: locationsSubLinks }
      ].map((item) => {
        if (item.ignore) {
          return null;
        }

        if (item.subLinks && !item.subLinks.ignore) {
          return (
            <DropDownItem key={item.name} name={item.name} href={item.href} subLinks={item.subLinks} />
          )
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
