import React from 'react';
import NoteEditor from '@/features/note/components/NoteEditor';

// The dynamic note detail page component for the note feature
export default function NotePage({ params }: { params: { noteId: string } }) {
  const { noteId } = params;
  return (
    <div>
      {/* Editor for note with ID: {noteId} */}
      <NoteEditor />
    </div>
  );
} 