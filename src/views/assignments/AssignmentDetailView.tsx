"use client";

// View component that orchestrates the assignment detail screen by connecting hooks and the AssignmentDetail component
import React from 'react';
import { useAssignmentsManager } from '@/hooks/useAssignmentsManager';
import { useNotesManager } from '@/hooks/useNotesManager';
import { useContextsManager } from '@/hooks/useContextsManager';
import { AssignmentDetail } from '@/features/assignments/components/AssignmentDetail';

const AssignmentDetailView: React.FC = () => {
  // Access active assignment and related actions
  const { activeAssignment, setActiveAssignment, toggleAssignmentCompletion } = useAssignmentsManager();

  // Access note operations for associated notes
  const {
    createNewNote,
    getAssignmentNotes,
    disassociateNoteFromAssignment,
    setActiveNote
  } = useNotesManager();

  // Access context lookup utility
  const { getContext } = useContextsManager();

  // If no assignment is selected, show a placeholder
  if (!activeAssignment) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Please select an assignment to view.
      </div>
    );
  }

  // Gather notes associated with the assignment
  const assignmentNotes = getAssignmentNotes(activeAssignment.id);

  // Handler to create a new note tied to this assignment
  const handleCreateNote = () => {
    createNewNote(activeAssignment.contextId, activeAssignment.id);
  };

  return (
    <AssignmentDetail
      assignment={activeAssignment}
      context={getContext(activeAssignment.contextId)}
      assignmentNotes={assignmentNotes}
      onBack={() => setActiveAssignment(null)}
      onToggleComplete={() => toggleAssignmentCompletion(activeAssignment.id)}
      onEditNote={(note) => setActiveNote(note)}
      onRemoveNote={(noteId) => disassociateNoteFromAssignment(noteId)}
      onCreateNote={handleCreateNote}
    />
  );
};

export default AssignmentDetailView; 