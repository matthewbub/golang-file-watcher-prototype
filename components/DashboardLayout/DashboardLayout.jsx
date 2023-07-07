import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { appConfig } from '../../config/appConfig';
import { DashboardSideNavigation } from '../DashboardSideNavigation';
import { UserAccountDropMenu } from '../UserAccountDropMenu';
import {
  StyledDashboardLayoutHeader,
  StyledDashboardLayoutLogo,
  StyledDashboardLayoutNotificationButton,
  StyledDashboardLayoutMainContent,
  StyledDashboardLayoutSecondaryContent,
} from './DashboardLayout.styled';

const DashboardLayout = ({ mainContent, secondaryContent, currentSideNavItem }) => {
  const messages = {
    viewNotifications: appConfig['DashboardLayout.Sr-Only.View-Notifications'],
  };

  return (
    <div className="flex min-h-full flex-col">
      <StyledDashboardLayoutHeader>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <StyledDashboardLayoutLogo src={appConfig.logo.src} alt={appConfig.logo.alt} />
          <div className="flex items-center gap-x-8">
            <StyledDashboardLayoutNotificationButton>
              <span className="sr-only">{messages.viewNotifications}</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </StyledDashboardLayoutNotificationButton>
            <div className="flex">
              <UserAccountDropMenu />
            </div>
          </div>
        </div>
      </StyledDashboardLayoutHeader>

      <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
        <aside className="sticky top-8 hidden w-44 shrink-0 lg:block">
          <DashboardSideNavigation current={currentSideNavItem} />
        </aside>

        {typeof mainContent === 'function' && <StyledDashboardLayoutMainContent>{mainContent()}</StyledDashboardLayoutMainContent>}

        {typeof secondaryContent === 'function' && <StyledDashboardLayoutSecondaryContent>{secondaryContent()}</StyledDashboardLayoutSecondaryContent>}
      </div>
    </div>
  );
};

export default DashboardLayout;
