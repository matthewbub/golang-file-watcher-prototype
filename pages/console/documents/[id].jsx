import { useState } from 'react';
import { get } from 'lodash';
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/react'


import { ConsoleLayout } from '@/components/ConsoleLayout';
import { ConfigurableForm } from '@/components/ConfigurableForm';
import { EllipsisIcon } from '@/components/Icons';
import { Button } from '@/components';

import PathHandler from '@/helpers/PathHandler';
import { baseClassNames } from '@/helpers/constants';

import clsx from 'clsx';
const pathHandler = new PathHandler('console');

const TipTap = ({ pageId, data }) => {
  const documentHtml = get(data, 'documents[0].document_html', '<p>Hello World! 🌎️</p>');
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    editorProps: {
      attributes: {
        class: 'min-h-screen prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg my-5 focus:outline-none',
      },
    },
    content: documentHtml || '<p>Hello World! 🌎️</p>',
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
    <div className={clsx(baseClassNames.containerPadding)}>
      <EditorContent
        editor={editor}
      />
    </div>
  )
}

const Page = ({ id, form, data, documentTitle }) => {
  const [open, setOpen] = useState(false);

  return (
    <ConsoleLayout
      primaryTitle={documentTitle}
      primary={() => (
        <>
          <TipTap pageId={id} data={data} />
          <ConfigurableForm
            open={open}
            setOpen={setOpen}
            form={form}
            slideOverTitle='Add Message'
            confirmModalTitle='Confirm'
            confirmModalDescription='Are you sure you want to submit this form?'
            confirmModalPrimaryAction='Submit Form'
            submitForm={(formFields) => {
              const documentTitle = get(formFields, 'document_title', 'Untitled Document');
              const description = get(formFields, 'document_description', '');
              const pageTitle = get(formFields, 'page_title', documentTitle);
              const screen = get(formFields, 'screen', '');
              const visibility = get(formFields, 'visibility', '');

              fetch('/api/v1/secure/modify-document-meta', {
                method: 'POST',
                body: JSON.stringify({
                  document_title: documentTitle,
                  document_description: description,
                  page_title: pageTitle,
                  screen: screen,
                  visibility: visibility,
                  id: id
                })
              }).then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
            }}
          // confirmBeforeSubmission={(formFields) => { console.log('confirmBeforeSubmission', formFields); }}
          />
        </>
      )}
      primaryAction={() => (
        <Button
          onClick={() => { setOpen(true) }}
          styleType='info'
        >
          <EllipsisIcon />
        </Button>
      )}
      breadcrumbs={[
        { name: 'Documents', href: pathHandler.getPath('documents') },
        { name: documentTitle, href: '/documents/' + id, current: true }
      ]}
    />

  )
}

export { getServerSideProps } from '@/ssp/console/documents/id';
export default Page;
