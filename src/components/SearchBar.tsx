import React from 'react';
import { Search } from 'lucide-react';
import { Note } from '@/types';

type SearchBarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  results: Note[];
  onResultClick?: (note: Note) => void;
  placeholder?: string;
};


const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  results,
  onResultClick,
  placeholder = 'Look for something...',
}) => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl focus-within:ring-2 focus-within:ring-gray-300 transition-colors">
        {/* Search Input */}
        <div className="flex items-center px-4 py-4 h-14">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 ml-3"
          />
        </div>

        {/* Results Dropdown integrated */}
        {query && (
          <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200">
            {results.length > 0 ? (
              results.map((note) => (
                <li
                  key={note.id}
                  className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => onResultClick && onResultClick(note)}
                >
                  <span className="text-xl">{note.emoji}</span>
                  <span className="text-sm text-gray-800">{note.title}</span>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-sm text-gray-500">No notes found.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;