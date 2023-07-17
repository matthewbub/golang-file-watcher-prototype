'use client'

import { useTranslation } from 'react-i18next';
import { ReusableNavigationList } from '@/components/Header/ReusableNavigationList';
import { DropDownItem } from '@/components/Header/DropDownItem';

export const SecondaryNavigationBar = () => {
  const { t } = useTranslation();
  return (
    <div className="hidden mx-auto lg:flex border-t border-b w-full items-center justify-between px-6 lg:px-8 py-2">
      <div className="flex lg:gap-x-12 mx-auto max-w-7xl w-full">
        <ReusableNavigationList />
      </div>
    </div>
  )
}
