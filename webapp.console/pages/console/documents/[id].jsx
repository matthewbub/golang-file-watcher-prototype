import { ConsoleLayout } from '../../../components/ConsoleLayout';
import { FullNavigation, navigation } from '../../../components/AppNavigation';
import PathHandler from '../../../helpers/PathHandler';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Button from '../../../components/Button';
import { useState } from 'react';
import { ConfigurableForm } from '../../../components/ConfigurableForm';
import { EllipsisIcon, SaveIcon } from '../../../components/Icons';
import { get } from 'lodash';

const Tiptap = ({ pageId, data }) => {
  const documentHtml = get(data, 'documents[0].document_html', '<p>Hello World! 🌎️</p>');
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg my-5 focus:outline-none',
      },
    },
    content: documentHtml,
    onUpdate: ({ editor }) => {
      fetch('/api/v1/secure/modify-document', {
        method: 'POST',
        body: JSON.stringify({
          document_html: editor.getHTML(),
          document_json: editor.getJSON(),
          id: pageId
        })
      }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }
  })

  // const json = editor.getJSON()


  return (
    <div className='min-h-screen'>
      <EditorContent
        editor={editor}
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
    <Button onClick={handleClick} styleType='dark'>
      <SaveIcon />
    </Button>
  )
}
const pathHandler = new PathHandler('console');

const Page = ({ id, form, data }) => {
  const [open, setOpen] = useState(false);
  return (
    <ConsoleLayout
      primaryTitle={id}
      primary={() => (
        <>
          <Tiptap pageId={id} data={data} />
          <ConfigurableForm
            open={open}
            setOpen={setOpen}
            form={form}
            slideOverTitle='Add Message'
            confirmModalTitle='Confirm'
            confirmModalDescription='Are you sure you want to submit this form?'
            confirmModalPrimaryAction='Submit Form'
            submitForm={(formFields) => {
              fetch('/api/v1/secure/modify-document-meta', {
                method: 'POST',
                body: JSON.stringify({
                  document_title: formFields.document_title,
                  page: formFields.page,
                  id: pageId
                })
              }).then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))


            }}
            confirmBeforeSubmission={(formFields) => { console.log(formFields); }}
          />
        </>
      )}
      primaryAction={() => (
        <div className='flex space-x-2'>
          <Button onClick={() => { setOpen(true) }} styleType='info'>
            <EllipsisIcon />
          </Button>
          <PrimaryAction />
        </div>

      )}
      breadcrumbs={[
        { name: 'Documents', href: '/documents' },
        { name: id, href: '/documents/' + id, current: true }
      ]}
    />

  )
}

export { getServerSideProps } from '../../../ssp/console/documents/id';
export default Page;
