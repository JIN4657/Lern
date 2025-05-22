import React from 'react';
import PromptCard from './PromptCard';
import { Prompt } from '../types';

// Component to list all prompts in a grid
export default function PromptList({ prompts, onPromptClick }: { prompts: Prompt[]; onPromptClick: (p: Prompt) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {prompts.map(prompt => (
        <PromptCard key={prompt.id} prompt={prompt} onClick={onPromptClick} />
      ))}
    </div>
  );
} 