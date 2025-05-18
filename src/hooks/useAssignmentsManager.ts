import { useState, useCallback } from "react";
import { Assignment } from "@/types";
import { initialAssignments } from "@/data/initialData";

/**
 * Custom hook for managing assignments-related state and operations
 */
export const useAssignmentsManager = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [activeAssignment, setActiveAssignment] = useState<Assignment | null>(null);
  const [showAddAssignmentModal, setShowAddAssignmentModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
    title: "",
    contextId: "",
    dueDate: new Date().toISOString().split('T')[0],
    description: "",
    priority: 'medium',
    completed: false,
  });

  // Toggle assignment completion status
  const toggleAssignmentCompletion = useCallback((assignmentId: string) => {
    setAssignments(prev => 
      prev.map(assignment =>
        assignment.id === assignmentId
          ? { ...assignment, completed: !assignment.completed }
          : assignment
      )
    );
    
    setActiveAssignment(prev => 
      prev && prev.id === assignmentId
        ? { ...prev, completed: !prev.completed }
        : prev
    );
  }, []);

  // Add a new assignment
  const addAssignment = useCallback(() => {
    if (!newAssignment.title) {
      alert("Please enter an assignment title");
      return false;
    }

    if (!newAssignment.dueDate) {
      alert("Please select a due date");
      return false;
    }
    
    if (!newAssignment.contextId) {
      alert("Please select a context");
      return false;
    }
    
    const assignment: Assignment = {
      id: `a${Date.now()}`,
      title: newAssignment.title,
      contextId: newAssignment.contextId,
      dueDate: new Date(newAssignment.dueDate).toISOString(),
      description: newAssignment.description || "",
      completed: false,
      priority: newAssignment.priority || 'medium',
    };
    
    setAssignments(prev => [...prev, assignment]);
    resetNewAssignment();
    setShowAddAssignmentModal(false);
    
    return true;
  }, [newAssignment]);

  // Reset the new assignment form
  const resetNewAssignment = useCallback((defaultContextId: string = "") => {
    setNewAssignment({
      title: "",
      contextId: defaultContextId,
      dueDate: new Date().toISOString().split('T')[0],
      description: "",
      priority: 'medium',
      completed: false,
    });
  }, []);

  return {
    assignments,
    setAssignments,
    activeAssignment,
    setActiveAssignment,
    showAddAssignmentModal,
    setShowAddAssignmentModal,
    newAssignment,
    setNewAssignment,
    toggleAssignmentCompletion,
    addAssignment,
    resetNewAssignment
  };
}; 