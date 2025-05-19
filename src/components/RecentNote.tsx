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
      <h3 className="text-lg font-semibold text-gray-900 ml-6 mb-4">{title}</h3>
      <div className="flex flex-row overflow-x-auto space-x-4 pb-2 hide-scrollbar">
        {notes.map((note, idx) => (
          <div
            key={note.id}
            className={[
              'flex-shrink-0',
              idx === 0 ? 'pl-6' : '',
              idx === notes.length - 1 ? 'pr-6' : '',
            ].join(' ')}
          >
            <NoteCard note={note} onClick={() => onNoteClick && onNoteClick(note)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNote; 