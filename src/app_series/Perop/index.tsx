'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clipboard, Sliders, PlusCircle, Copy, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Prompt, Segment } from './types';
import { escapeHtml } from './utils/escapeHtml';

export default function Perop() {
  // State for storing all prompts
  const [prompts, setPrompts] = useState<Prompt[]>([
    { id: '1', title: 'Greeting', content: 'Hello, world!', description: 'Shows a basic greeting message.' },
    { id: '2', title: 'Personalized Greeting', content: 'Hello [name], welcome to [platform]!', description: 'Greets a user by name on a platform.' },
  ]);
  // State for which prompt is currently selected for viewing
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Form state for creating a new prompt
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Toast notification state
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // State for folder menu
  const [folderMenuOpen, setFolderMenuOpen] = useState(false);
  // Example folder list (static for now)
  const folders = ['All Prompts', 'Favorites', 'Archived'];
  // State for selected folder
  const [selectedFolder, setSelectedFolder] = useState(folders[0]);

  // Open the view modal for a prompt
  const openPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setModalOpen(true);
  };
  const closePrompt = () => {
    setModalOpen(false);
    setSelectedPrompt(null);
  };

  // Open/close create-prompt modal
  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => {
    setCreateModalOpen(false);
    setNewTitle('');
    setNewContent('');
    setNewDescription('');
  };

  // Save a new prompt to state
  const handleSavePrompt = () => {
    if (!newTitle.trim() || !newContent.trim() || !newDescription.trim()) return;
    const id = Date.now().toString();
    setPrompts(prev => [...prev, { id, title: newTitle, content: newContent, description: newDescription }]);
    closeCreateModal();
  };

  // Show a temporary toast message
  const showCopyToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Parse the selected prompt's content into text and variable segments
  const segments = useMemo(() => {
    if (!selectedPrompt) return [];
    const regex = /\[([^\]]+)\]/g;
    const segs: Segment[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    const content = selectedPrompt.content;
    while ((match = regex.exec(content))) {
      segs.push({ type: 'text', value: content.slice(lastIndex, match.index) });
      segs.push({ type: 'var', value: match[1] });
      lastIndex = match.index + match[0].length;
    }
    segs.push({ type: 'text', value: content.slice(lastIndex) });
    return segs;
  }, [selectedPrompt]);

  // Extract unique variable names from segments
  const varNames = useMemo(
    () => Array.from(new Set(segments.filter(s => s.type === 'var').map(s => s.value))),
    [segments]
  );

  // State for user-entered variable values and preview text
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [previewText, setPreviewText] = useState('');
  // Add a state to indicate if the copy was successful
  const [copied, setCopied] = useState(false);

  // Initialize variable inputs whenever the variable list changes
  useEffect(() => {
    const initial: Record<string, string> = {};
    varNames.forEach(name => {
      initial[name] = '';
    });
    setInputValues(initial);
  }, [varNames]);

  // Build the preview text by interleaving static text and user inputs
  useEffect(() => {
    const built = segments
      .map(s => (s.type === 'text' ? s.value : inputValues[s.value] || `{${s.value}}`))
      .join('');
    setPreviewText(built);
  }, [inputValues, segments]);

  // Handle changes in individual variable input fields
  const handleInputChange = (name: string, value: string) => {
    setInputValues(prev => ({ ...prev, [name]: value }));
  };

  // Handle manual edits in the preview, updating variable inputs accordingly
  const handlePreviewChange = (value: string) => {
    const newInputs: Record<string, string> = {};
    varNames.forEach(name => {
      // Find static bounds around each variable to extract user-edited value
      const index = segments.findIndex(s => s.type === 'var' && s.value === name);
      const before = segments[index - 1]?.value || '';
      const after = segments[index + 1]?.value || '';
      const start = value.indexOf(before) + before.length;
      const end = after ? value.indexOf(after, start) : value.length;
      if (start >= before.length && end > start) {
        newInputs[name] = value.slice(start, end);
      } else {
        newInputs[name] = '';
      }
    });
    setInputValues(newInputs);
  };

  // Copy logic for both quick and variable prompts
  const handleCopy = () => {
    const isVariable = varNames.length > 0;
    const toCopy = isVariable ? previewText : selectedPrompt?.content || '';
    navigator.clipboard.writeText(toCopy);
    showCopyToast('Copied to clipboard!');
    setCopied(true); // Set copied state to true for feedback
    // Revert copied state after 1.5 seconds
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2 relative">
          {/* Use a div as a button wrapper to align title flush left */}
          <div
            role="button" tabIndex={0}
            className="flex items-center space-x-1 text-lg font-semibold text-gray-700 rounded pl-0 pr-2 py-1 focus:outline-none min-w-0"
            onClick={() => setFolderMenuOpen((open) => !open)}
            aria-haspopup="menu"
            aria-expanded={folderMenuOpen}
          >
            {/* Folder title */}
            <span>{selectedFolder}</span>
            {/* Chevron icon - ensure vertical centering with self-center */}
            <ChevronRight size={20} className="ml-1 self-center" />
          </div>
          {/* Dropdown menu for folders */}
          {folderMenuOpen && (
            <div className="absolute left-10 top-8 z-10 bg-white border border-gray-200 rounded shadow-md min-w-[140px]">
              {folders.map((folder) => (
                <button
                  key={folder}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedFolder === folder ? 'font-bold text-blue-600' : ''}`}
                  onClick={() => {
                    setSelectedFolder(folder);
                    setFolderMenuOpen(false);
                  }}
                  type="button"
                >
                  {folder}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Minimal create prompt icon only, no container or shadow */}
        <motion.button
          className="text-black hover:text-gray-700 transition-colors duration-200 focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={openCreateModal}
          aria-label="Create Prompt"
        >
          <PlusCircle size={24} />
        </motion.button>
      </div>

      {/* Grid of prompt cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {prompts.map(prompt => {
          const hasVars = /\[[^\]]+\]/.test(prompt.content);
          return (
            <motion.div
              key={prompt.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              onClick={() => openPrompt(prompt)}
            >
              <div className="flex items-center mb-2">
                {hasVars ? <Sliders size={16} className="mr-2" /> : <Clipboard size={16} className="mr-2" />}
                <h2 className="font-semibold">{prompt.title}</h2>
              </div>
              {/* Display the prompt's description instead of content snippet */}
              <p className="text-sm text-gray-700">{prompt.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* View prompt modal */}
      <AnimatePresence>
        {modalOpen && selectedPrompt && (
          <motion.div
            // Light blurred backdrop for modal
            className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-md flex justify-center items-center z-50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              // Modal card with soft background and rounded corners
              className="bg-white/80 backdrop-blur-sm rounded-2xl max-w-lg w-full p-8 shadow-xl relative"
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                onClick={closePrompt}
                aria-label="Close prompt viewer"
              >
                <X size={20} />
              </button>
              {/* Prompt title displayed prominently */}
              <h2 className="text-2xl font-semibold mb-6">{selectedPrompt.title}</h2>

              {/* Variable inputs styled as placeholder-only fields */}
              {varNames.map(name => (
                <div key={name} className="mb-4">
                  <input
                    className="w-full bg-gray-50 p-2 rounded-xl border border-gray-200 focus:ring focus:ring-blue-200 outline-none"
                    placeholder={name}
                    value={inputValues[name] || ''}
                    onChange={e => handleInputChange(name, e.target.value)}
                  />
                </div>
              ))}

              {/* Preview area with inline styling */}
              <textarea
                className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 focus:ring focus:ring-blue-200 mb-6 outline-none"
                value={previewText}
                onChange={e => handlePreviewChange(e.target.value)}
                rows={varNames.length > 0 ? 4 : 3}
              />

              {/* Copy button with smooth transitions */}
              <motion.button
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                  copied
                    ? 'bg-green-800 text-white'
                    : Object.values(inputValues).every(v => v)
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
                whileHover={{ scale: !copied && Object.values(inputValues).every(v => v) ? 1.05 : 1 }}
                onClick={handleCopy}
                disabled={!(varNames.length === 0 || Object.values(inputValues).every(v => v)) || copied}
                aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
              >
                {copied ? (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <Copy size={16} />
                )}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create prompt modal */}
      <AnimatePresence>
        {createModalOpen && (
          <motion.div
            className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-md flex justify-center items-center z-40"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-2xl max-w-md w-full p-8 shadow-xl relative"
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
            >
              <button className="absolute top-4 right-4" onClick={closeCreateModal}>
                <X size={20} />
              </button>
              {/* Editable title placeholder */}
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full text-2xl font-semibold mb-2 placeholder-gray-400 focus:outline-none bg-transparent border-none"
                  placeholder="Untitled"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                />
              </div>
              {/* Description input for the new prompt */}
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full bg-gray-50 p-2 rounded-xl border border-gray-200 focus:ring focus:ring-blue-200 outline-none"
                  placeholder="Description"
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                />
              </div>
              {/* Prompt content input with inline highlighting */}
              <div className="mb-6">
                <div className="relative">
                  {/* Highlight layer behind textarea, shows highlighted variables inline */}
                  <div
                    aria-hidden="true"
                    className={`absolute top-0 left-0 w-full h-full bg-gray-50 p-4 rounded-xl border ${!newContent ? 'border-red-300' : 'border-gray-200'} whitespace-pre-wrap font-sans text-base pointer-events-none`}
                    style={{ fontFamily: 'inherit', fontSize: '1rem', whiteSpace: 'pre-wrap' }}
                    dangerouslySetInnerHTML={{
                      __html: (() => {
                        let html = '';
                        const regex = /\[([^\]]+)\]/g;
                        let lastIndex = 0;
                        let match;
                        while ((match = regex.exec(newContent))) {
                          html += escapeHtml(newContent.slice(lastIndex, match.index));
                          html += `<span class='bg-yellow-200 text-yellow-900 px-1 rounded font-mono'>[${escapeHtml(match[1])}]</span>`;
                          lastIndex = match.index + match[0].length;
                        }
                        html += escapeHtml(newContent.slice(lastIndex));
                        // Show placeholder when empty
                        if (!newContent) {
                          html = '<span class="text-gray-400">Type your prompt here and define [variable] inline.</span>';
                        }
                        return html;
                      })(),
                    }}
                  />
                  {/* Transparent textarea on top for user input, maintains cursor position */}
                  <textarea
                    className="w-full bg-transparent p-4 rounded-xl border outline-none resize-none font-sans text-base"
                    style={{ fontFamily: 'inherit', fontSize: '1rem', whiteSpace: 'pre-wrap' }}
                    rows={6}
                    placeholder="Type your prompt here and define [variable] inline."
                    value={newContent}
                    onChange={e => setNewContent((e.target as HTMLTextAreaElement).value)}
                  />
                </div>
                {/* Inline validation for empty content */}
                {!newContent && (
                  <span className="text-xs text-red-500">Content is required.</span>
                )}
                {/* Show detected variables and check for duplicates */}
                {(() => {
                  // Extract variables from newContent
                  const regex = /\[([^\]]+)\]/g;
                  const foundVars: string[] = [];
                  let match;
                  while ((match = regex.exec(newContent))) {
                    foundVars.push(match[1]);
                  }
                  const uniqueVars = Array.from(new Set(foundVars));
                  const hasDuplicateVars = foundVars.length !== uniqueVars.length;
                  return (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {uniqueVars.map(v => (
                        <span key={v} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-mono">{v}</span>
                      ))}
                      {/* Duplicate variable warning */}
                      {hasDuplicateVars && (
                        <span className="text-xs text-red-500 mt-1">Duplicate variable names detected!</span>
                      )}
                    </div>
                  );
                })()}
              </div>
              {/* Action buttons: Save and Clear */}
              <div className="flex gap-2 justify-end mt-4">
                <motion.button
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setNewTitle('');
                    setNewContent('');
                    setNewDescription('');
                  }}
                  type="button"
                >
                  Clear
                </motion.button>
                <motion.button
                  className={`px-4 py-2 rounded ${
                    newTitle && newContent && newDescription && !(() => {
                      // Check for duplicate variables
                      const regex = /\[([^\]]+)\]/g;
                      const foundVars: string[] = [];
                      let match;
                      while ((match = regex.exec(newContent))) {
                        foundVars.push(match[1]);
                      }
                      return foundVars.length !== Array.from(new Set(foundVars)).length;
                    })()
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                  whileHover={{ scale: newTitle && newContent && newDescription ? 1.05 : 1 }}
                  onClick={handleSavePrompt}
                  disabled={
                    !newTitle ||
                    !newContent ||
                    !newDescription ||
                    (() => {
                      // Disable if duplicate variables
                      const regex = /\[([^\]]+)\]/g;
                      const foundVars: string[] = [];
                      let match;
                      while ((match = regex.exec(newContent))) {
                        foundVars.push(match[1]);
                      }
                      return foundVars.length !== Array.from(new Set(foundVars)).length;
                    })()
                  }
                >
                  Save
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg flex items-center space-x-2"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            aria-live="polite" // Accessibility: announce toast to screen readers
          >
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
