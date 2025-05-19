"use client";

import React, { useState } from 'react';
import { Note } from '@/types';
import { initialNotes } from '@/data/initialData';
import SearchBar from '@/components/SearchBar';
import RecentNote from '@/components/RecentNote';
import { useRouter } from 'next/navigation';

/**
 * HomeView: Main view for the home page.
 * Holds note data and passes props to SearchBar and RecentNote components.
 */
const HomeView: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const router = useRouter();

  // Filter notes based on search query
  const filteredNotes: Note[] = initialNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase())
  );

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
      <div className="px-6">
        <SearchBar
          query={query}
          onQueryChange={handleQueryChange}
          results={filteredNotes}
          onResultClick={handleNoteClick}
        />
      </div>
      <RecentNote notes={recentNotes} onNoteClick={handleNoteClick} />
    </div>
  );
};

export default HomeView; 