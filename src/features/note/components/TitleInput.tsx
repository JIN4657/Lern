import React from 'react';

/**
 * TitleInput renders a Notion-style editable title input for notes.
 * Uses Tailwind CSS for styling. Controlled via value/onChange props.
 *
 * - Matches the editor's width and horizontal padding (pl-16 pr-16 for 4rem)
 * - Aligns text to the left
 * - Reduces bottom margin for closer spacing to the editor
 */
interface TitleInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const TitleInput: React.FC<TitleInputProps> = ({ value, onChange, placeholder = 'Untitled' }) => (
  <input
    className="w-full pl-16 pr-16 text-left text-3xl md:text-4xl font-bold bg-transparent border-none outline-none py-2 mb-2 mt-8 text-gray-900 placeholder-gray-400 focus:shadow-[0_1px_0_0_#d1d5db] transition-shadow"
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    aria-label="Note title"
    autoComplete="off"
    spellCheck={true}
  />
);

export default TitleInput; 