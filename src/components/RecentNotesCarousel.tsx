import React from "react";
import { Note } from "@/types";
import { initialContexts } from "@/data/initialData";

/**
 * Renders the 3 most recent notes in a horizontal layout.
 * - Perfectly balanced card design with centered content
 * - Bold titles limited to 2 lines with ellipsis
 * - Visually balanced typography and spacing
 * - Consistent horizontal layout on all screen sizes
 */
export interface RecentNotesCarouselProps {
  notes: Note[];
  onNoteClick: (note: Note) => void;
}

export const RecentNotesCarousel: React.FC<RecentNotesCarouselProps> = ({
  notes = [], // default to empty array if undefined
  onNoteClick,
}) => {
  // Sort notes by last modified and take the first 3 items
  const recentNotes = React.useMemo(
    () =>
      [...notes]
        .sort(
          (a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
        )
        .slice(0, 3),
    [notes]
  );

  if (recentNotes.length === 0) {
    return (
      <div className="w-full text-xs text-center text-gray-500 dark:text-gray-400 py-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
        No recent notes available
      </div>
    );
  }

  // Get context name for a note
  const getContextName = (contextId: string) => {
    const context = initialContexts.find(c => c.id === contextId);
    return context?.name || "";
  };

  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {recentNotes.map((note) => (
        <div
          key={note.id}
          onClick={() => onNoteClick(note)}
          className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-blue-200 dark:hover:ring-blue-800 transition-all hover:shadow-md flex flex-col h-[6.5rem] min-w-0 pt-5 px-4 pb-4"
        >
          <div className="flex-1 mb-3">
            <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight">{note.title}</h3>
          </div>
          <div className="pb-1">
            <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 py-0.5 px-2 rounded-full truncate max-w-full inline-block">
              {getContextName(note.contextId)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}; 