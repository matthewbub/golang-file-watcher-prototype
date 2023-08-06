import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Select from './Select'

// Extend the expect function with the toHaveNoViolations matcher
expect.extend(toHaveNoViolations)

const mockRegister = () => {
  return {
    onChange: () => { },
    onBlur: () => { },
    ref: () => { },
  }
};

describe('Select component', () => {
  const options = [
    { id: 'option1', name: 'Option 1' },
    { id: 'option2', name: 'Option 2' },
  ]

  it('renders without accessibility violations', async () => {
    const { container } = render(
      <Select
        name="test-select"
        placeholder="Select an option"
        register={mockRegister}
        options={options}
      />
    )

    // Check for accessibility violations
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders options correctly', () => {
    const { getByText } = render(
      <Select
        name="test-select"
        placeholder="Select an option"
        register={mockRegister}
        options={options}
      />
    )

    // Check if options are rendered correctly
    options.forEach((option) => {
      const optionElement = getByText(option.name)
      expect(optionElement).toBeInTheDocument()
    })
  })
})