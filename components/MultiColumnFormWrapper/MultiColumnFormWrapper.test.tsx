import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { MultiColumnFormWrapper } from '@/components/MultiColumnFormWrapper'

// Extend the expect function with the toHaveNoViolations matcher
expect.extend(toHaveNoViolations)

const HelloWorld = () => <>{'I\'m a make-believe form!'}</>

describe('MultiColumnFormWrapper component', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(
      <MultiColumnFormWrapper
        title="Hello, World!"
        description="I'm a description!"
      >
        <HelloWorld />
      </MultiColumnFormWrapper>
    )

    // Check for accessibility violations
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders options correctly', () => {
    const { getByText } = render(
      <MultiColumnFormWrapper
        title="Hello, World!"
        description="I'm a description!"
      >
        <HelloWorld />
      </MultiColumnFormWrapper>
    )


    expect(getByText("Hello, World!")).toBeInTheDocument()
    expect(getByText("I'm a description!")).toBeInTheDocument()
    expect(getByText('I\'m a make-believe form!')).toBeInTheDocument()
  })
})