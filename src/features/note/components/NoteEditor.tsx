'use client';
import React, { useState } from 'react';
// TipTap dependencies for rich-text editing
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// import feature-specific CSS for the editor
import '@/features/note/styles/NoteEditor.css';
import { Bold, Italic, Strikethrough, Code as CodeIcon, List as ListIcon, ListOrdered, RotateCcw as Undo, RotateCw as Redo } from 'lucide-react';
import BubbleMenuBar from './BubbleMenuBar';
import TitleInput from './TitleInput';

// You can import feature-specific styles here, e.g.:
// import '@/features/note/styles/NoteEditor.css';

// Initial content for the editor
const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you'd probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That's a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn't that great? And all of that is editable. But wait, there's more. Let's try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It's only the tip of the iceberg though. Give it a try and click a little bit around. Don't forget to check the other examples too.
</p>
<blockquote>
  Wow, that's amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

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
export const NoteEditor: React.FC = () => {
  // Local state for the note title (replace with props/state management as needed)
  const [title, setTitle] = useState('');
  const editor = useEditor({ extensions, content });
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