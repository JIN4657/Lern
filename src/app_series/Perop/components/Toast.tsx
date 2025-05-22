import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Component for toast notifications
export default function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          aria-live="polite"
        >
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 