import { useState, useCallback } from "react";
import { Note } from "@/types";
import { initialNotes } from "@/data/initialData";

/**
 * Custom hook for managing notes-related state and operations
 */
export const useNotesManager = () => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [draggedNoteId, setDraggedNoteId] = useState<string | null>(null);

  // Create a new note
  const createNewNote = useCallback((contextId: string, assignmentId?: string) => {
    const newNote: Note = {
      id: `n${Date.now()}`,
      title: "Untitled Note",
      contextId,
      content: "",
      lastModified: new Date().toISOString(),
      assignmentId
    };
    
    setNotes(prev => [...prev, newNote]);
    setActiveNote(newNote);
    
    return newNote;
  }, []);

  // Update note content
  const updateNoteContent = useCallback((noteId: string, content: string) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === noteId 
          ? { ...note, content, lastModified: new Date().toISOString() } 
          : note
      )
    );
    
    setActiveNote(prev => 
      prev && prev.id === noteId 
        ? { ...prev, content, lastModified: new Date().toISOString() } 
        : prev
    );
  }, []);

  // Update note title
  const updateNoteTitle = useCallback((noteId: string, title: string) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === noteId 
          ? { ...note, title, lastModified: new Date().toISOString() } 
          : note
      )
    );
    
    setActiveNote(prev => 
      prev && prev.id === noteId 
        ? { ...prev, title, lastModified: new Date().toISOString() } 
        : prev
    );
  }, []);

  // Associate a note with an assignment
  const associateNoteWithAssignment = useCallback((noteId: string, assignmentId: string) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === noteId 
          ? { ...note, assignmentId, lastModified: new Date().toISOString() } 
          : note
      )
    );
  }, []);

  // Disassociate a note from an assignment
  const disassociateNoteFromAssignment = useCallback((noteId: string) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === noteId 
          ? { ...note, assignmentId: undefined, lastModified: new Date().toISOString() } 
          : note
      )
    );
  }, []);
  
  // Get notes for an assignment
  const getAssignmentNotes = useCallback((assignmentId: string) => {
    return notes.filter(note => note.assignmentId === assignmentId);
  }, [notes]);

  // Drag and drop handlers
  const handleDragStart = useCallback((noteId: string) => {
    setDraggedNoteId(noteId);
  }, []);

  const handleDrop = useCallback((assignmentId: string) => {
    if (draggedNoteId) {
      associateNoteWithAssignment(draggedNoteId, assignmentId);
      setDraggedNoteId(null);
    }
  }, [draggedNoteId, associateNoteWithAssignment]);
  
  return {
    notes,
    setNotes,
    activeNote,
    setActiveNote,
    draggedNoteId,
    setDraggedNoteId,
    createNewNote,
    updateNoteContent,
    updateNoteTitle,
    associateNoteWithAssignment,
    disassociateNoteFromAssignment,
    getAssignmentNotes,
    handleDragStart,
    handleDrop
  };
}; 