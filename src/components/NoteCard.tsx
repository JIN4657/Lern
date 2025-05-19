import React from 'react';
import { Note } from '@/types';
type NoteCardProps = {
  note: Note;
  onClick?: () => void; // Optional click handler
};

// NoteCard: A reusable card component to display a note with emoji and title.
// Handles optional click callback for interactions.
const NoteCard: React.FC<NoteCardProps> = ({ note, onClick }) => (
  <div
    className="w-36 h-32 flex flex-col relative rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden bg-white dark:bg-neutral-900 select-none cursor-pointer"
    onClick={onClick}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    aria-pressed={onClick ? false : undefined}
  >
    {/* Top section for emoji */}
    <div className="h-[38%] bg-neutral-100 dark:bg-neutral-800 rounded-t-2xl" />
    <span className="absolute left-4 top-[38%] -translate-y-1/2 text-3xl">
      {note.emoji}
    </span>
    {/* Bottom section for title */}
    <div className="h-[62%] flex items-start px-4 pt-2 pb-3">
      <span
        className="text-left pt-5 font-semibold text-neutral-900 dark:text-neutral-100 text-sm leading-tight w-full line-clamp-2"
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden',
        }}
      >
        {note.title}
      </span>
    </div>
  </div>
);

export default NoteCard; 