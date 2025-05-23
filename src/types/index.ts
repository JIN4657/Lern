// Define the core data types for the note-taking application

import type { JSONContent } from '@tiptap/react';

export interface Note {
  id: string;
  title: string;
  emoji: string;
  contextId: string;
  content: JSONContent;
  lastModified: string;
  assignmentId?: string; // Optional field to link a note to an assignment
}

export interface Context {
  id: string;
  name: string;
  color: string;
}

export interface Assignment {
  id: string;
  title: string;
  contextId: string;
  dueDate: string;
  description: string;
  completed: boolean;
} 