import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import NotificationWithActions from './NotificationWithActions';

// Extend Jest with the toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('NotificationWithActions', () => {
  const props = {
    show: true,
    title: 'Test Title',
    description: 'Test Description',
    primaryActionLabel: 'Primary Action',
    primaryAction: jest.fn(),
    secondaryActionLabel: 'Secondary Action',
    secondaryAction: jest.fn(),
  };

  it('renders the correct content', () => {
    const { getByText } = render(<NotificationWithActions {...props} />);

    expect(getByText(props.title)).toBeInTheDocument();
    expect(getByText(props.description)).toBeInTheDocument();
    expect(getByText(props.primaryActionLabel)).toBeInTheDocument();
    expect(getByText(props.secondaryActionLabel)).toBeInTheDocument();
  });

  it('invokes callbacks when buttons are clicked', () => {
    const { getByText } = render(<NotificationWithActions {...props} />);

    fireEvent.click(getByText(props.primaryActionLabel));
    expect(props.primaryAction).toHaveBeenCalledTimes(1);

    fireEvent.click(getByText(props.secondaryActionLabel));
    expect(props.secondaryAction).toHaveBeenCalledTimes(1);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<NotificationWithActions {...props} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
