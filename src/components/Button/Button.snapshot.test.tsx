import { render } from '@testing-library/react'
import { Button } from '@/src/components/Button'

it('renders Button unchanged', () => {
  const { container } = render(<Button>{'Hello, World!'}</Button>)
  expect(container).toMatchSnapshot()
})