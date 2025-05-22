import { useState, useEffect, useMemo } from 'react';
import { Prompt, Segment } from '../types';
import { escapeHtml } from '../utils/escapeHtml';

export function usePromptManager() {
  // List of prompts and CRUD handlers
  const [prompts, setPrompts] = useState<Prompt[]>([
    { id: '1', title: 'Greeting', content: 'Hello, world!', description: 'Shows a basic greeting message.' },
    { id: '2', title: 'Personalized Greeting', content: 'Hello [name], welcome to [platform]!', description: 'Greets a user by name on a platform.' },
  ]);
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

  // Folder menu state
  const [folderMenuOpen, setFolderMenuOpen] = useState(false);
  const folders = ['All Prompts', 'Favorites', 'Archived'];
  const [selectedFolder, setSelectedFolder] = useState(folders[0]);

  // Handlers for opening/closing modals
  const openPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setModalOpen(true);
  };
  const closePrompt = () => {
    setModalOpen(false);
    setSelectedPrompt(null);
  };
  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => {
    setCreateModalOpen(false);
    setNewTitle('');
    setNewContent('');
    setNewDescription('');
  };

  // Save a new prompt
  const handleSavePrompt = () => {
    if (!newTitle.trim() || !newContent.trim() || !newDescription.trim()) return;
    const id = Date.now().toString();
    setPrompts(prev => [...prev, { id, title: newTitle, content: newContent, description: newDescription }]);
    closeCreateModal();
  };

  // Toast utility
  const showCopyToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Parse selected prompt into segments
  const segments = useMemo<Segment[]>(() => {
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

  // Unique variable names
  const varNames = useMemo(() => Array.from(new Set(segments.filter(s => s.type === 'var').map(s => s.value))), [segments]);

  // User input values and preview text
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [previewText, setPreviewText] = useState('');
  const [copied, setCopied] = useState(false);

  // Initialize inputs when variables change
  useEffect(() => {
    const initial: Record<string, string> = {};
    varNames.forEach(name => {
      initial[name] = '';
    });
    setInputValues(initial);
  }, [varNames]);

  // Build preview text
  useEffect(() => {
    const built = segments
      .map(s => (s.type === 'text' ? s.value : inputValues[s.value] || `{${s.value}}`))
      .join('');
    setPreviewText(built);
  }, [inputValues, segments]);

  // Handle input change
  const handleInputChange = (name: string, value: string) => {
    setInputValues(prev => ({ ...prev, [name]: value }));
  };

  // Handle manual preview edits
  const handlePreviewChange = (value: string) => {
    const newInputs: Record<string, string> = {};
    varNames.forEach(name => {
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

  // Copy to clipboard
  const handleCopy = () => {
    const isVariable = varNames.length > 0;
    const toCopy = isVariable ? previewText : selectedPrompt?.content || '';
    navigator.clipboard.writeText(toCopy);
    showCopyToast('Copied to clipboard!');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return {
    // Data
    prompts,
    selectedPrompt,
    folders,
    // UI state
    modalOpen,
    createModalOpen,
    folderMenuOpen,
    selectedFolder,
    // Form state
    newTitle,
    newContent,
    newDescription,
    inputValues,
    previewText,
    toastMessage,
    showToast,
    varNames,
    segments,
    copied,
    // Actions
    openPrompt,
    closePrompt,
    openCreateModal,
    closeCreateModal,
    handleSavePrompt,
    handleInputChange,
    handlePreviewChange,
    handleCopy,
    showCopyToast,
    setNewTitle,
    setNewContent,
    setNewDescription,
    setSelectedFolder,
  };
} 