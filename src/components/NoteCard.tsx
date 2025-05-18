import React from "react";
import { Note, Context } from "@/types";
import { ContextTag } from "@/components/ContextTag";

interface NoteCardProps {
  note: Note;
  context: Context | undefined;
  onClick: () => void;
  onDragStart?: (noteId: string) => void;
}

/**
 * Reusable square note card for carousels and other views.
 */
export const NoteCard = ({
  note,
  context,
  onClick,
  onDragStart,
}: NoteCardProps) => {
  const handleDragStart = (e: React.DragEvent) => {
    onDragStart?.(note.id);
  };

  return (
    <div
      onClick={onClick}
      draggable={!!onDragStart}
      onDragStart={onDragStart ? handleDragStart : undefined}
      className="flex-none w-36 h-36 p-3 rounded-xl border border-gray-200 hover:border-gray-300 cursor-pointer transition-all duration-200 bg-white hover:shadow-sm flex flex-col"
    >
      <h3 className="font-bold text-sm text-left mb-2 whitespace-normal break-words">
        {note.title}
      </h3>
      {context && (
        <div className="mt-auto flex justify-start">
          <ContextTag label={context.name} color={context.color} size="small" />
        </div>
      )}
    </div>
  );
}; 