import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Tabs } from './index';

// Extend the expect function with the toHaveNoViolations matcher
expect.extend(toHaveNoViolations)

const mockData = [
  { label: 'Tab 1', href: '#', current: true, as: 'a' },
  { label: 'Tab 2', onClick: () => { }, current: false, as: 'button' },
  { label: 'Tab 3', href: '#', current: false, as: 'a' },
]

describe('Tabs component', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(
      <Tabs tabs={[
        { label: 'Tab 1', href: '#', current: true, as: 'a' },
        { label: 'Tab 2', onClick: () => { }, current: false, as: 'button' },
        { label: 'Tab 3', href: '#', current: false, as: 'a' },
      ]} />
    )

    // Check for accessibility violations
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders Tabs correctly', () => {
    const { getByText } = render(
      <Tabs tabs={[
        { label: 'Tab 1', href: '#', current: true, as: 'a' },
        { label: 'Tab 2', onClick: () => { }, current: false, as: 'button' },
        { label: 'Tab 3', href: '#', current: false, as: 'a' },
      ]} />
    )


    const optionElement = getByText('Tab 1')
    expect(optionElement).toBeInTheDocument()

  })
})