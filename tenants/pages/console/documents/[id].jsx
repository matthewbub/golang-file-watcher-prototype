import { ConsoleLayout } from '../../../components/ConsoleLayout';
import { FullNavigation, navigation } from '../../../components/AppNavigation';
import PathHandler from '../../../helpers/PathHandler';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <EditorContent editor={editor} />
  )
}

const pathHandler = new PathHandler('console');

const DocumentIdPage = ({ id }) => {
  return (
    <ConsoleLayout
      primaryTitle={id}
      primary={() => (
        <Tiptap />
      )}
    />

  )
}

export { getServerSideProps } from '../../../ssp/console/documents/id';
export default DocumentIdPage;
