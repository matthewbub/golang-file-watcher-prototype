import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { DashboardSideNavigation } from '../components/DashboardSideNavigation';

describe('DashboardSideNavigation', () => {
  const navigation = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  test('renders navigation items correctly', () => {
    render(<DashboardSideNavigation navigation={navigation} />);

    const navigationItems = screen.getAllByRole('listitem');
    expect(navigationItems).toHaveLength(navigation.length);

    navigationItems.forEach((item, index) => {
      expect(item).toHaveTextContent(navigation[index].name);
    });
  });

  test('marks current navigation item as active', () => {
    const current = '/about';
    render(<DashboardSideNavigation navigation={navigation} current={current} />);

    const activeItem = screen.getByText('About');
    expect(activeItem).toHaveClass('active');
  });
});
