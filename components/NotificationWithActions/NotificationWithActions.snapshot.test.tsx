import React from 'react'
import { render } from '@testing-library/react'
import NotificationWithActions from './NotificationWithActions'

const Mock = () => (
  <NotificationWithActions
    show={true}
    title="Hello, World!"
    description="I'm a description!"
    primaryActionLabel="Primary Action"
    primaryAction={() => { }}
    secondaryActionLabel="Secondary Action"
    secondaryAction={() => { }}
  />
);

it('renders MultiColumnFormWrapper unchanged', () => {
  const { container } = render(<Mock />)
  expect(container).toMatchSnapshot()
});