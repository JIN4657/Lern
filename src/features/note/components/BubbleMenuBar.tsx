import React from 'react';
import { BubbleMenu, Editor } from '@tiptap/react';
import { Bold, Italic, Strikethrough, Code as CodeIcon, List as ListIcon, ListOrdered, RotateCcw as Undo, RotateCw as Redo } from 'lucide-react';

interface BubbleMenuBarProps {
  editor: Editor;
}

/**
 * BubbleMenuBar renders a modern, light bubble menu using Tailwind CSS and lucide-react icons.
 * It appears when text is selected in the TipTap editor.
 */
const BubbleMenuBar: React.FC<BubbleMenuBarProps> = ({ editor }) => {
  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className="flex gap-1 rounded-lg bg-white shadow-lg border border-gray-200 px-2 py-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${editor.isActive('bold') ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
          aria-label="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${editor.isActive('italic') ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
          aria-label="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${editor.isActive('strike') ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
          aria-label="Strikethrough"
        >
          <Strikethrough size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${editor.isActive('code') ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
          aria-label="Code"
        >
          <CodeIcon size={18} />
        </button>
        <span className="w-px bg-gray-200 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${editor.isActive('bulletList') ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
          aria-label="Bullet List"
        >
          <ListIcon size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${editor.isActive('orderedList') ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
          aria-label="Ordered List"
        >
          <ListOrdered size={18} />
        </button>
        <span className="w-px bg-gray-200 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
          aria-label="Undo"
        >
          <Undo size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
          aria-label="Redo"
        >
          <Redo size={18} />
        </button>
      </div>
    </BubbleMenu>
  );
};

export default BubbleMenuBar; 