"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Context, Note, Assignment } from '@/types';
import { initialNotes, initialAssignments } from '@/data/initialData';
import NoteCard from '@/components/NoteCard';

interface ContextViewProps {
  context: Context;
}

// ContextView: Displays a focused context with its notes and assignments.
const ContextView: React.FC<ContextViewProps> = ({ context }) => {
  const router = useRouter();

  // Filter notes and assignments by context ID
  const notes: Note[] = initialNotes.filter((note) => note.contextId === context.id);
  const assignments: Assignment[] = initialAssignments.filter(
    (asgn) => asgn.contextId === context.id
  );

  const handleNoteClick = (note: Note) => {
    router.push(`/notes/${note.id}`);
  };

  const handleAssignmentClick = (asgn: Assignment) => {
    router.push(`/assignments/${asgn.id}`);
  };

  return (
    <div className="p-6">
      {/* Context title with color */}
      <h1
        className="text-2xl font-bold mb-6"
        style={{ color: context.color }}
      >
        {context.name}
      </h1>

      {/* Notes Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Notes</h2>
        <div className="flex flex-wrap gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={() => handleNoteClick(note)}
            />
          ))}
        </div>
      </section>

      {/* Assignments Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Assignments</h2>
        <div className="space-y-4">
          {assignments.map((asgn) => (
            <div
              key={asgn.id}
              className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
            >
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                  {asgn.title}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Due: {new Date(asgn.dueDate).toLocaleDateString()}
                </p>
              </div>
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={() => handleAssignmentClick(asgn)}
              >
                View Assignment
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContextView; 