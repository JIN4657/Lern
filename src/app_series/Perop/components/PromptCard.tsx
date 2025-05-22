import React from 'react';
import { Prompt } from '../types';
import { motion } from 'framer-motion';
import { Clipboard, Sliders } from 'lucide-react';

// Component for a single prompt card
export default function PromptCard({ prompt, onClick }: { prompt: Prompt; onClick: (p: Prompt) => void }) {
  const hasVars = /\[[^\]]+\]/.test(prompt.content);
  return (
    <motion.div
      className="border rounded-lg p-4 cursor-pointer hover:shadow-lg"
      whileHover={{ scale: 1.02 }}
      onClick={() => onClick(prompt)}
    >
      <div className="flex items-center mb-2">
        {hasVars ? <Sliders size={16} className="mr-2" /> : <Clipboard size={16} className="mr-2" />}
        <h2 className="font-semibold">{prompt.title}</h2>
      </div>
      <p className="text-sm text-gray-700">{prompt.description}</p>
    </motion.div>
  );
} 