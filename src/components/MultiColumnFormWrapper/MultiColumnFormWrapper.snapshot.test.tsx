import { render } from '@testing-library/react'
import { MultiColumnFormWrapper } from '@/components/MultiColumnFormWrapper'

const HelloWorld = () => <>{'I\'m a make-believe form!'}</>
const MockMultiColumnFormWrapper = () => (
  <MultiColumnFormWrapper
    title="Hello, World!"
    description="I'm a description!"
  >
    <HelloWorld />
  </MultiColumnFormWrapper>
);

it('renders MultiColumnFormWrapper unchanged', () => {
  const { container } = render(<MockMultiColumnFormWrapper />)
  expect(container).toMatchSnapshot()
});