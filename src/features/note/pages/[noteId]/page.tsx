import React from 'react';
import NoteEditor from '@/features/note/components/NoteEditor';
import { initialNotes } from '@/data/initialData';
import { notFound } from 'next/navigation';

// The dynamic note detail page component for the note feature
export default function NotePage({ params }: { params: { noteId: string } }) {
  const { noteId } = params;
  // Lookup the note in initial data
  const note = initialNotes.find(n => n.id === noteId);
  if (!note) {
    // Render 404 page if not found
    notFound();
  }
  return (
    <div>
      {/* Editor for the selected note */}
      <NoteEditor title={note.title} content={note.content} />
    </div>
  );
} 