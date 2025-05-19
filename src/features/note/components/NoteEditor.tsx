'use client';
import React, { useState } from 'react';
// TipTap dependencies for rich-text editing
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import type { JSONContent } from '@tiptap/react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// import feature-specific CSS for the editor
import '@/features/note/styles/NoteEditor.css';
import BubbleMenuBar from './BubbleMenuBar';
import TitleInput from './TitleInput';

// You can import feature-specific styles here, e.g.:
// import '@/features/note/styles/NoteEditor.css';

// Props for NoteEditor: title and JSON-based content
interface NoteEditorProps {
  title: string;
  content: JSONContent;
}

// Configure extensions for the editor
const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  StarterKit.configure({
    bulletList: { keepMarks: true, keepAttributes: false },
    orderedList: { keepMarks: true, keepAttributes: false },
  }),
];

// NoteEditor component renders the EditorProvider with the configured extensions and content
export const NoteEditor: React.FC<NoteEditorProps> = ({ title: initialTitle, content: initialContent }) => {
  // Local state for the note title, initialized from props
  const [title, setTitle] = useState(initialTitle);
  // Initialize editor with JSON content passed via props
  const editor = useEditor({ extensions, content: initialContent });
  if (!editor) return null;
  return (
    <div className="tiptap">
      {/* Notion-style editable title input using Tailwind and TitleInput component */}
      <TitleInput
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      {/* Bubble menu and editor content */}
      <BubbleMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default NoteEditor; 