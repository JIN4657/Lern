import React from 'react';

// Component for selecting prompt folders
export default function FolderMenu({ folders, selected, onSelect }: {
  folders: string[];
  selected: string;
  onSelect: (folder: string) => void;
}) {
  return (
    <div className="relative inline-block">
      <button className="flex items-center space-x-1 text-lg font-semibold text-gray-700 focus:outline-none">
        <span>{selected}</span>
        <svg className="ml-1" width="16" height="16" fill="currentColor"><path d="M4 6l4 4 4-4" /></svg>
      </button>
      <div className="absolute mt-2 bg-white border border-gray-200 rounded shadow-lg min-w-[140px]">
        {folders.map(folder => (
          <button
            key={folder}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${selected === folder ? 'font-bold text-blue-600' : ''}`}
            onClick={() => onSelect(folder)}
            type="button"
          >
            {folder}
          </button>
        ))}
      </div>
    </div>
  );
} 