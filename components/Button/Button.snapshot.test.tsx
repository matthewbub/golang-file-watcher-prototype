import { render } from '@testing-library/react'
import { Button } from '@/components/Button'

it('renders Select unchanged', () => {
  const { container } = render(<Button>{'Hello, World!'}</Button>)
  expect(container).toMatchSnapshot()
})