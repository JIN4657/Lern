'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clipboard, Sliders, PlusCircle, Copy, X } from 'lucide-react';

// Define the Prompt type
type Prompt = { id: string; title: string; content: string };

export default function Page() {
  // State for storing all prompts
  const [prompts, setPrompts] = useState<Prompt[]>([
    { id: '1', title: 'Greeting', content: 'Hello, world!' },
    { id: '2', title: 'Personalized Greeting', content: 'Hello [name], welcome to [platform]!' },
  ]);
  // State for which prompt is currently selected for viewing
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Form state for creating a new prompt
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // Toast notification state
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

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
  };

  // Save a new prompt to state
  const handleSavePrompt = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const id = Date.now().toString();
    setPrompts(prev => [...prev, { id, title: newTitle, content: newContent }]);
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
    const segs: { type: 'text' | 'var'; value: string }[] = [];
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
      {/* Header with Create Prompt button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Prompt Vault</h1>
        <motion.button
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openCreateModal}
        >
          <PlusCircle size={20} />
          <span>Create Prompt</span>
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
              <p
                className="text-sm text-gray-700"
                style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
              >
                {/* Show up to 3 lines of prompt, render vars as {var} */}
                {prompt.content.replace(/\[([^\]]+)\]/g, '{$1}')}
              </p>
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
              <div className="mb-6">
                <input
                  type="text"
                  className="w-full text-2xl font-semibold mb-2 placeholder-gray-400 focus:outline-none bg-transparent border-none"
                  placeholder="Untitled"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                />
              </div>
              {/* Prompt content input with inline highlighting */}
              <div className="mb-6">
                <div className="relative">
                  {/* Hidden textarea for accessibility */}
                  <textarea
                    className="w-full absolute top-0 left-0 opacity-0 pointer-events-none h-full resize-none"
                    tabIndex={-1}
                    aria-hidden="true"
                    value={newContent}
                    readOnly
                  />
                  {/* Contenteditable area styled as soft, light rounded field */}
                  <div
                    className={`w-full bg-gray-50 p-4 rounded-xl border ${!newContent ? 'border-red-300' : 'border-gray-200'} focus-within:border-blue-300 focus-within:ring focus-within:ring-blue-200 min-h-[120px] whitespace-pre-wrap font-sans text-base outline-none`}
                    contentEditable
                    suppressContentEditableWarning
                    spellCheck={false}
                    style={{ fontFamily: 'inherit', fontSize: '1rem' }}
                    onInput={e => setNewContent((e.target as HTMLDivElement).innerText)}
                    onBlur={e => setNewContent((e.target as HTMLDivElement).innerText)}
                    dangerouslySetInnerHTML={{
                      __html: (() => {
                        const escapeHtml = (str: string) =>
                          str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                        const regex = /\[([^\]]+)\]/g;
                        let lastIndex = 0;
                        let match;
                        let html = '';
                        while ((match = regex.exec(newContent))) {
                          html += escapeHtml(newContent.slice(lastIndex, match.index));
                          html += `<span class='bg-yellow-200 text-yellow-900 px-1 rounded font-mono'>[${escapeHtml(match[1])}]</span>`;
                          lastIndex = match.index + match[0].length;
                        }
                        html += escapeHtml(newContent.slice(lastIndex));
                        // Placeholder when empty
                        if (!newContent) {
                          html = '<span class="text-gray-400">Type your prompt here and define [variable] inline.</span>';
                        }
                        return html;
                      })(),
                    }}
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
                  }}
                  type="button"
                >
                  Clear
                </motion.button>
                <motion.button
                  className={`px-4 py-2 rounded ${
                    newTitle && newContent && !(() => {
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
                  whileHover={{ scale: newTitle && newContent ? 1.05 : 1 }}
                  onClick={handleSavePrompt}
                  disabled={
                    !newTitle ||
                    !newContent ||
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
