import { useState } from 'react';
import { get } from 'lodash';
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent, FloatingMenu, ReactNodeViewRenderer } from '@tiptap/react'
import { Node } from '@tiptap/core'

import { ConsoleLayout, Button } from '../../../components';
import { EllipsisIcon } from '../../../components/Icons';


import PathHandler from '../../../helpers/PathHandler';
import { baseClassNames } from '../../../helpers/constants';

import clsx from 'clsx';
const pathHandler = new PathHandler('console');

import { NodeViewWrapper } from '@tiptap/react'

const MyComponent = (props) => {
  const { node } = props;
  const { attrs } = node;

  return (
    <NodeViewWrapper>
      <input type="text" value={attrs.value1} onChange={(e) => props.updateAttributes({ value1: e.target.value })} />
      <input type="text" value={attrs.value2} onChange={(e) => props.updateAttributes({ value2: e.target.value })} />
      <p>Value 1: {attrs.value1}</p>
      <p>Value 2: {attrs.value2}</p>
    </NodeViewWrapper>
  );
}

const CustomNode = Node.create({
  name: 'customNode',

  defaultOptions: {
    HTMLAttributes: {},
  },

  group: 'block',

  content: 'inline*',

  addAttributes() {
    return {
      value1: {
        default: '',
      },
      value2: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'custom-node',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['custom-node', HTMLAttributes, 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(MyComponent)
  },
})

const TipTap = ({ pageId, data }) => {
  const documentHtml = get(data, 'documents[0].document_html', '<p>Hello World! 🌎️</p>');
  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomNode
    ],
    editorProps: {
      attributes: {
        class: 'min-h-screen prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg my-5 focus:outline-none',
      },
    },
    content: documentHtml || '<p>Hello World! 🌎️</p>',
    onUpdate: ({ editor, ...rest }) => {
      console.log('rest', rest, 'editor', editor)
    }
  })

  // const json = editor.getJSON()


  return (
    <div className={clsx(baseClassNames.containerPadding)}>
      {editor && <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          h1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          h2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          bullet list
        </button>
        <button onClick={() => editor.chain().focus().setNode('customNode', { value1: 'Hello', value2: 'World' }).run()}>
          Insert Custom Node
        </button>
      </FloatingMenu>}
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

export default Page;
