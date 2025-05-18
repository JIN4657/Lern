"use client";

import React, { useState } from "react";
import { FileText, FolderPlus, ClipboardPlus, Search, Plus } from "lucide-react";
import { RecentNotesCarousel } from "@/components/RecentNotesCarousel";
import { Note } from "@/types";
import { initialNotes } from "@/data/initialData";

/**
 * HomeView: Landing screen with search bar, recent notes carousel, and quick action buttons
 * - Harmonious visual balance across all elements
 * - Responsive layout with consistent spacing ratios
 * - Implements spotlight-style search with balanced proportions
 */
interface HomeViewProps {
  // We can make these optional since we'll provide defaults
  notes?: Note[];
  onNoteClick?: (note: Note) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  // Use initial data as fallback
  notes = initialNotes,
  onNoteClick = (note) => console.log("Note clicked:", note.title),
}) => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6">
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* Spotlight-like search bar */}
        <div className="w-full mb-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search notes and assignments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 sm:h-14 pl-9 sm:pl-10 pr-4 rounded-xl border-0 bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-shadow dark:text-gray-100"
            />
          </div>
        </div>

        {/* Recent notes carousel encouraging users to jump back in */}
        <div className="w-full mb-10">
          <h2 className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Jump back to</h2>
          <RecentNotesCarousel notes={notes} onNoteClick={onNoteClick} />
        </div>

        {/* Quick action buttons for common tasks */}
        <div className="grid grid-cols-3 gap-3 w-full">
          <button className="flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 h-11 sm:h-12 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-900 dark:text-gray-100" />
            <span className="ml-1.5 sm:ml-2">Note</span>
          </button>
          <button className="flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 h-11 sm:h-12 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <FolderPlus className="h-4 w-4 sm:h-5 sm:w-5 text-gray-900 dark:text-gray-100" />
            <span className="ml-1.5 sm:ml-2">Context</span>
          </button>
          <button className="flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 h-11 sm:h-12 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-gray-900 dark:text-gray-100" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView; 