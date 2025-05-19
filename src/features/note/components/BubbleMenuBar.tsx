import React from 'react';
import { BubbleMenu, Editor } from '@tiptap/react';
import { RotateCcw as Undo, RotateCw as Redo, Heading1, List as ListIcon, ListOrdered, MessageSquareCode, MessageSquareQuote, Bold, Italic, Strikethrough, Code as CodeIcon } from 'lucide-react';

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
      {/*
        Modern, soft, and light bubble menu styling:
        - More rounded corners (rounded-2xl)
        - Softer shadow (shadow-md)
        - Lighter border (border-gray-100)
        - Subtle background (bg-white/90 with backdrop-blur)
        - Smaller height (py-0.5, px-1.5)
        - Smaller gap between buttons (gap-0.5)
        - Slightly smaller icon size (16)
      */}
      <div className="inline-flex flex-nowrap gap-0.5 rounded-2xl bg-white shadow-md border border-gray-100 px-1.5 py-0.5 overflow-x-auto backdrop-blur-sm">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
          aria-label="Undo"
        >
          <Undo size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
          aria-label="Redo"
        >
          <Redo size={16} />
        </button>
        <span className="w-px bg-gray-100 mx-0.5" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1.5 rounded-lg hover:bg-gray-50 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'text-blue-500 bg-blue-50' : 'text-gray-600'}`}
          aria-label="Heading"
        >
          <Heading1 size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded-lg hover:bg-gray-50 transition-colors ${editor.isActive('bulletList') ? 'text-blue-500 bg-blue-50' : 'text-gray-600'}`}
          aria-label="Bullet List"
        >
          <ListIcon size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded-lg hover:bg-gray-50 transition-colors ${editor.isActive('orderedList') ? 'text-blue-500 bg-blue-50' : 'text-gray-600'}`}
          aria-label="Ordered List"
        >
          <ListOrdered size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-1.5 rounded-lg hover:bg-gray-50 transition-colors ${editor.isActive('codeBlock') ? 'text-blue-500 bg-blue-50' : 'text-gray-600'}`}
          aria-label="Code Block"
        >
          <MessageSquareCode size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded-lg hover:bg-gray-50 transition-colors ${editor.isActive('blockquote') ? 'text-blue-500 bg-blue-50' : 'text-gray-600'}`}
          aria-label="Quote"
        >
          <MessageSquareQuote size={16} />
        </button>
        <span className="w-px bg-gray-100 mx-0.5" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-lg hover:bg-gray-50 transition-colors ${editor.isActive('bold') ? 'text-blue-500 bg-blue-50' : 'text-gray-600'}`}
          aria-label="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-lg hover:bg-gray-50 transition-colors ${editor.isActive('italic') ? 'text-blue-500 bg-blue-50' : 'text-gray-600'}`}
          aria-label="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded-lg hover:bg-gray-50 transition-colors ${editor.isActive('strike') ? 'text-blue-500 bg-blue-50' : 'text-gray-600'}`}
          aria-label="Strikethrough"
        >
          <Strikethrough size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-1.5 rounded-lg hover:bg-gray-50 transition-colors ${editor.isActive('code') ? 'text-blue-500 bg-blue-50' : 'text-gray-600'}`}
          aria-label="Code"
        >
          <CodeIcon size={16} />
        </button>
      </div>
    </BubbleMenu>
  );
};

export default BubbleMenuBar; 