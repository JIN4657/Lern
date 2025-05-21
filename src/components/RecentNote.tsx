import React from 'react';
import NoteCard from '@/components/NoteCard';
import { Note } from '@/types';

type RecentNoteProps = {
  notes: Note[];
  title?: string;
  onNoteClick?: (note: Note) => void;
};

// RecentNote: Displays a horizontal list of recent notes passed as props.
// Applies edge padding and calls `onNoteClick` when a card is clicked.
const RecentNote: React.FC<RecentNoteProps> = ({
  notes,
  onNoteClick,
  title = 'Jump back to...',
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 ml-6 mb-4 md:ml-30">{title}</h3>
      <div className="flex flex-row overflow-x-auto space-x-4 pb-2 hide-scrollbar pl-6 pr-6 md:pl-30 md:pr-30">
        {notes.map((note) => (
          <div key={note.id} className="flex-shrink-0">
            <NoteCard note={note} onClick={() => onNoteClick && onNoteClick(note)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNote; 