"use client";

import React, { useState } from 'react';
import { Note, Context } from '@/types';
import { initialNotes, initialContexts } from '@/data/initialData';
import SearchBar from '@/components/SearchBar';
import RecentNote from '@/components/RecentNote';
import { useRouter } from 'next/navigation';
import ContextMenu from '@/features/contexts/components/ContextMenu';

/**
 * HomeView: Main view for the home page.
 * Holds note data and passes props to SearchBar and RecentNote components.
 */
const HomeView: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  // State for contexts list
  const [contexts, setContexts] = useState<Context[]>(initialContexts);

  const router = useRouter();

  // Handler for when a context is selected
  const handleContextSelect = (ctx: Context) => {
    router.push(`/context/${ctx.id}`);
  };

  // Filter notes based on search query
  const filteredNotes: Note[] = initialNotes.filter((note) => {
    const search = query.toLowerCase();
    return (
      note.title.toLowerCase().includes(search) ||
      JSON.stringify(note.content).toLowerCase().includes(search)
    );
  });

  // Sort notes by last modified date descending and select top 3
  const recentNotes: Note[] = [...initialNotes]
    .sort(
      (a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    )
    .slice(0, 3);

  // Handler for search query changes
  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  // Handler for when a note is clicked (recent or search result)
  const handleNoteClick = (note: Note) => {
    // Navigate to note detail page
    router.push(`/notes/${note.id}`);
  };

  return (
    <div>
      <div className="px-6 ">
        <SearchBar
          query={query}
          onQueryChange={handleQueryChange}
          results={filteredNotes}
          onResultClick={handleNoteClick}
        />
      </div>
      
      <RecentNote notes={recentNotes} onNoteClick={handleNoteClick} />
      <ContextMenu
        contexts={contexts}
        onSelect={handleContextSelect}
      />
    </div>
  );
};

export default HomeView; 