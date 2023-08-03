import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from '@/components/Button'

// Extend the expect function with the toHaveNoViolations matcher
expect.extend(toHaveNoViolations)

const helloWorld = 'Hello, World!'

describe('Button component', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(
      <Button>{helloWorld}</Button>
    )

    // Check for accessibility violations
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders options correctly', () => {
    const { getByText } = render(
      <Button>{helloWorld}</Button>
    )

    const element = getByText(helloWorld)
    expect(element).toBeInTheDocument()
  })
})