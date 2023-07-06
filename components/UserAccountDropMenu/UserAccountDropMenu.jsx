'use client';

import React from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import { appConfig } from '../../config/appConfig';
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  StyledMenu,
  StyledMenuButton,
  StyledTransition,
  StyledMenuItems,
  StyledMenuText,
  StyledMenuItem,
  StyledLogoutLink,
} from './UserAccountDropMenu.styled';

const UserAccountDropMenu = () => {
  const { user, loading } = useUser();
  const messages = {
    account: appConfig['UserAccountDropMenu.Sr-Only.Account'],
    currentUsernameLabel: appConfig['UserAccountDropMenu.Label.Current-Username'],
    accountSettingsLabel: appConfig['UserAccountDropMenu.Label.Account-Settings'],
    supportLabel: appConfig['UserAccountDropMenu.Label.Support'],
    licenseLabel: appConfig['UserAccountDropMenu.Label.License'],
    logOutLabel: appConfig['UserAccountDropMenu.Label.Log-out'],
  };

  return (
    <StyledMenu>
      <div>
        <StyledMenuButton>
          <span className="sr-only">{messages.account}</span>
          <UserIcon className="h-6 w-6" aria-hidden="true" />
        </StyledMenuButton>
      </div>

      <StyledTransition>
        <StyledMenuItems>
          <div className="px-4 py-3">
            <StyledMenuText>{messages.currentUsernameLabel}</StyledMenuText>
            {user.name && !loading && (
              <p className="truncate text-sm font-medium text-gray-900">{user.name}</p>
            )}
          </div>
          <div className="py-1">
            <StyledMenuItem href='/settings'>{messages.accountSettingsLabel}</StyledMenuItem>
            <StyledMenuItem href='/support'>{messages.supportLabel}</StyledMenuItem>
            <StyledMenuItem href='/license'>{messages.licenseLabel}</StyledMenuItem>
          </div>
          <div className="py-1">
            <StyledLogoutLink>{messages.logOutLabel}</StyledLogoutLink>
          </div>
        </StyledMenuItems>
      </StyledTransition>
    </StyledMenu>
  );
};

export default UserAccountDropMenu;
