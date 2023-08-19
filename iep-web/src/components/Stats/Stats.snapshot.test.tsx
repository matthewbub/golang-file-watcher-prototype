import { render } from '@testing-library/react'
import { Stats } from './index'

it('renders Stats component unchanged', () => {
  const { container } = render(<Stats />)
  expect(container).toMatchSnapshot()
})
