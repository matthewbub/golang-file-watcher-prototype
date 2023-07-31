import { ConsoleLayout } from '../../../components/ConsoleLayout';
import { FullNavigation, navigation } from '../../../components/AppNavigation';
import PathHandler from '../../../helpers/PathHandler';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Button from '../../../components/Button';
import { useState } from 'react';


const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg my-5 focus:outline-none',
      },
    },
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <div className='min-h-screen'>
      <EditorContent
        editor={editor}
        onChange={({ editor }) => {
          console.log(editor.getHTML())
        }}
      />
    </div>
  )
}
const PrimaryAction = () => {
  const [saved, setSaved] = useState(false);

  const handleClick = async () => {
    const response = await fetch('/api/v1/secure/create-document')
    const data = await response.json();

    // // TODO - handle error
    // router.push('/documents/' + data.redirectId);
  }

  return (
    <Button onClick={handleClick}>
      {'Save document'}
    </Button>
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
      primaryAction={PrimaryAction}
      breadcrumbs={[
        { name: 'Documents', href: '/documents' },
        { name: id, href: '/documents/' + id, current: true }
      ]}
    />

  )
}

export { getServerSideProps } from '../../../ssp/console/documents/id';
export default DocumentIdPage;
