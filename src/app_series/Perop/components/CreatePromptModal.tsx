import React from 'react';
import { Prompt } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Modal for creating a new prompt
export default function CreatePromptModal({
  isOpen,
  newTitle,
  newDescription,
  newContent,
  onTitleChange,
  onDescriptionChange,
  onContentChange,
  onSave,
  onClose,
  duplicateWarning,
}: {
  isOpen: boolean;
  newTitle: string;
  newDescription: string;
  newContent: string;
  onTitleChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
  onContentChange: (val: string) => void;
  onSave: () => void;
  onClose: () => void;
  duplicateWarning: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-md flex justify-center items-center z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="bg-white/80 backdrop-blur-sm rounded-2xl max-w-md w-full p-8 shadow-xl relative" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
            <button className="absolute top-4 right-4" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
            <div className="mb-4">
              <input
                type="text"
                className="w-full text-2xl font-semibold mb-2 placeholder-gray-400 focus:outline-none bg-transparent border-none"
                placeholder="Untitled"
                value={newTitle}
                onChange={e => onTitleChange(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full bg-gray-50 p-2 rounded-xl border border-gray-200 focus:ring focus:ring-blue-200 outline-none"
                placeholder="Description"
                value={newDescription}
                onChange={e => onDescriptionChange(e.target.value)}
              />
            </div>
            <div className="mb-6 relative">
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 w-full h-full bg-gray-50 p-4 rounded-xl border whitespace-pre-wrap font-sans text-base pointer-events-none"
                style={{ fontFamily: 'inherit', fontSize: '1rem', whiteSpace: 'pre-wrap' }}
                dangerouslySetInnerHTML={{ __html: newContent }}
              />
              <textarea
                className="w-full bg-transparent p-4 rounded-xl border outline-none resize-none font-sans text-base"
                style={{ fontFamily: 'inherit', fontSize: '1rem', whiteSpace: 'pre-wrap' }}
                rows={6}
                placeholder="Type your prompt here and define [variable] inline."
                value={newContent}
                onChange={e => onContentChange(e.target.value)}
              />
            </div>
            {duplicateWarning && <span className="text-xs text-red-500">Duplicate variable names detected!</span>}
            <div className="flex gap-2 justify-end mt-4">
              <motion.button
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  onTitleChange('');
                  onContentChange('');
                  onDescriptionChange('');
                }}
                type="button"
              >
                Clear
              </motion.button>
              <motion.button
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                onClick={onSave}
                disabled={!newTitle || !newContent || !newDescription || duplicateWarning}
              >
                Save
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 