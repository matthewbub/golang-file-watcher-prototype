import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Stats } from './index';

// Extend the expect function with the toHaveNoViolations matcher
expect.extend(toHaveNoViolations)

const mockStats = [
  { name: 'Number of deploys', value: '405' },
  { name: 'Average deploy time', value: '3.65', unit: 'mins' },
  { name: 'Number of failures', value: '3' },
  { name: 'Success rate', value: '98.5%' },
]

describe('Stats component', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(
      <Stats stats={mockStats} />
    )

    // Check for accessibility violations
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders stats correctly', () => {
    const { getByText } = render(
      <Stats stats={mockStats} />
    )

    // Check if options are rendered correctly
    mockStats.forEach((option) => {
      const optionElement = getByText(option.name)
      expect(optionElement).toBeInTheDocument()
    })
  })
})