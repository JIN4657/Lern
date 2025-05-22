import React from 'react';
import { Prompt } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy } from 'lucide-react';

// Modal for viewing and copying a prompt
export default function PromptViewerModal({
  isOpen,
  prompt,
  varNames,
  inputValues,
  previewText,
  copied,
  onInputChange,
  onPreviewChange,
  onCopy,
  onClose,
}: {
  isOpen: boolean;
  prompt: Prompt | null;
  varNames: string[];
  inputValues: Record<string, string>;
  previewText: string;
  copied: boolean;
  onInputChange: (name: string, value: string) => void;
  onPreviewChange: (val: string) => void;
  onCopy: () => void;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && prompt && (
        <motion.div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-md flex justify-center items-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="bg-white/80 backdrop-blur-sm rounded-2xl max-w-lg w-full p-8 shadow-xl relative" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
            <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
            <h2 className="text-2xl font-semibold mb-6">{prompt.title}</h2>
            {varNames.map(name => (
              <div key={name} className="mb-4">
                <input
                  className="w-full bg-gray-50 p-2 rounded-xl border border-gray-200 focus:ring focus:ring-blue-200 outline-none"
                  placeholder={name}
                  value={inputValues[name] || ''}
                  onChange={e => onInputChange(name, e.target.value)}
                />
              </div>
            ))}
            <textarea
              className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 focus:ring focus:ring-blue-200 mb-6 outline-none"
              value={previewText}
              onChange={e => onPreviewChange(e.target.value)}
              rows={varNames.length > 0 ? 4 : 3}
            />
            <motion.button
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${copied ? 'bg-green-800 text-white' : Object.values(inputValues).every(v => v) ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
              whileHover={{ scale: !copied && Object.values(inputValues).every(v => v) ? 1.05 : 1 }}
              onClick={onCopy}
              disabled={!(varNames.length === 0 || Object.values(inputValues).every(v => v)) || copied}
              aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
            >
              {copied ? <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> : <Copy size={16} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 