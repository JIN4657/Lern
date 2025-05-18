import { useState, useCallback } from "react";
import { Context } from "@/types";
import { initialContexts } from "@/data/initialData";

/**
 * Custom hook for managing contexts-related state and operations
 */
export const useContextsManager = () => {
  const [contexts, setContexts] = useState<Context[]>(initialContexts);
  const [activeContext, setActiveContext] = useState<string | null>(null);
  const [showAddContextModal, setShowAddContextModal] = useState(false);
  const [newContextName, setNewContextName] = useState("");

  // Get a context by ID
  const getContext = useCallback((id: string) => {
    return contexts.find(c => c.id === id);
  }, [contexts]);

  // Add a new context
  const addContext = useCallback(() => {
    if (!newContextName) {
      alert("Please enter a context name");
      return false;
    }
    
    const context: Context = {
      id: `c${Date.now()}`,
      name: newContextName,
      color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`,
    };
    
    setContexts(prev => [...prev, context]);
    setNewContextName("");
    setShowAddContextModal(false);
    
    return true;
  }, [newContextName]);

  return {
    contexts,
    setContexts,
    activeContext,
    setActiveContext,
    showAddContextModal,
    setShowAddContextModal,
    newContextName,
    setNewContextName,
    getContext,
    addContext
  };
}; 