import React, { forwardRef } from 'react';
import StarterKit from '@tiptap/starter-kit';
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/react';
import clsx from 'clsx';
import { FieldWrapper } from '../FieldWrapper';

const TipTap = forwardRef(({
  name,
  label,
  className,
  ...rest
}, ref) => {
  const editor = useEditor({
    extensions: [
      StarterKit
    ],
    editorProps: {
      attributes: {
        class: clsx(
          'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg focus:outline-none',
          'txt1 bg2',
          'placeholder:text-neutral-500/80',
          'ring-1 ring-inset ring-white/20',
          'focus:ring-2 focus:ring-inset focus:ring-teal-600',
          'block w-full rounded-md border-0 py-1.5 px-2.5 shadow-sm',
          'sm:text-sm sm:leading-6',
          'h-40 overflow-x-scroll'
        ),
      },
    },
    content: '<p>Hello World! 🌎️</p>',
    onUpdate: ({ editor, ...rest }) => {
      console.log('rest', rest, 'editor', editor)
    }
  })

  return (
    <FieldWrapper
      label={label}
      name={name}
      className={className}
    >
      <div className=''>
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
          ref={ref}
          editor={editor}
          {...rest}
        />
      </div>
    </FieldWrapper>
  )
})

export default TipTap;