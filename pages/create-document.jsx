import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
function CreateDocumentPage() {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value:', value);
  }, []);

  return (
    <div>
      <div className='space-x-2 flex flex-wrap'>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()}>
          Strike
        </button>
        <button onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}>
          H1
        </button>
        <button onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}>
          H2
        </button>
        <button onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}>
          H3
        </button>
        <button onClick={() => editor.chain().focus().setHeading({ level: 4 }).run()}>
          H4
        </button>
        <button onClick={() => editor.chain().focus().setParagraph().run()}>
          Paragraph
        </button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          Code block
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          Bullet list
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          Ordered list
        </button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          Blockquote
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          Horizontal rule
        </button>
      </div>
      <div className='prose'>
        <EditorContent editor={editor} />
      </div>

      <div>
        <CodeMirror
          value="console.log('hello world!');"
          height="200px"
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
        />
      </div>

    </div>

  )
}

export default withPageAuthRequired(CreateDocumentPage);
