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
    <EditorContent editor={editor}
      onChange={({ editor }) => {
        console.log(editor.getHTML())
      }}
    />
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
      breadcrumbs={[
        { name: 'Documents', href: '/documents' },
        { name: id, href: '/documents/' + id, current: true }
      ]}
    />

  )
}

export { getServerSideProps } from '../../../ssp/console/documents/id';
export default DocumentIdPage;
