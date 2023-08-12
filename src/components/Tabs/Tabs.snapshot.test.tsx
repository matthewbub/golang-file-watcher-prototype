import { render } from '@testing-library/react'
import { Tabs } from './index'

it('renders Tabs component unchanged', () => {
  const { container } = render(<Tabs tabs={[
    { label: 'Tab 1', href: '#', current: true, as: 'a' },
    { label: 'Tab 2', onClick: () => { }, current: false, as: 'button' },
    { label: 'Tab 3', href: '#', current: false, as: 'a' },
  ]} />)
  expect(container).toMatchSnapshot()
})
