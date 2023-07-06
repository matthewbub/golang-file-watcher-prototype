import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from '@testing-library/react';
import { UserAccountDropMenu } from '../components/UserAccountDropMenu';

// Mocking useUser hook
jest.mock('@auth0/nextjs-auth0/client', () => ({
  useUser: () => ({
    user: { name: 'John Doe' },
    loading: false,
  }),
}));

// Mocking appConfig
jest.mock('../config/appConfig', () => ({
  appConfig: {
    'UserAccountDropMenu.Sr-Only.Account': 'Account',
    'UserAccountDropMenu.Label.Current-Username': 'Current Username',
    'UserAccountDropMenu.Label.Account-Settings': 'Account Settings',
    'UserAccountDropMenu.Label.Support': 'Support',
    'UserAccountDropMenu.Label.License': 'License',
    'UserAccountDropMenu.Label.Log-out': 'Log out',
  },
}));

describe('UserAccountDropMenu', () => {
  it('renders menu button and menu items', () => {
    act(() => {
      render(<UserAccountDropMenu />);
    });

    // Verify that menu items are initially hidden
    const currentUsernameLabel = screen.queryByText(/current username/i);
    const accountSettingsLabel = screen.queryByText(/account settings/i);
    const supportLabel = screen.queryByText(/support/i);
    const licenseLabel = screen.queryByText(/license/i);
    const logoutLabel = screen.queryByText(/log out/i);

    expect(currentUsernameLabel).toBeNull();
    expect(accountSettingsLabel).toBeNull();
    expect(supportLabel).toBeNull();
    expect(licenseLabel).toBeNull();
    expect(logoutLabel).toBeNull();

    // Click the menu button
    act(() => {
      // Click the menu button
      fireEvent.click(screen.getByRole('button', { id: /iep-user-dropdown/i }));
    });

    // Verify that menu items are now visible
    expect(screen.getByText(/current username/i)).toBeInTheDocument();
    expect(screen.getByText(/account settings/i)).toBeInTheDocument();
    expect(screen.getByText(/support/i)).toBeInTheDocument();
    expect(screen.getByText(/license/i)).toBeInTheDocument();
    expect(screen.getByText(/log out/i)).toBeInTheDocument();
  });

  it('displays user name when available', () => {
    act(() => {
      render(<UserAccountDropMenu />);
    });

    // Verify that user name is initially hidden
    const userName = screen.queryByText(/John Doe/i);
    expect(userName).toBeNull();

    act(() => {
      // Click the menu button
      fireEvent.click(screen.getByRole('button', { id: /iep-user-dropdown/i }));
    });

    // Verify that user name is displayed
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });
});
