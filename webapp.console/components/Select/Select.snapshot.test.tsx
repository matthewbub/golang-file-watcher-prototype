import { render } from '@testing-library/react'
import { Select } from './Select'

it('renders homepage unchanged', () => {
  const { container } = render(<Select
    name="test-select"
    placeholder="Select an option"
    register={() => { }}
    options={[
      { id: 'option1', name: 'Option 1' },
      { id: 'option2', name: 'Option 2' },
    ]}
  />)
  expect(container).toMatchSnapshot()
})