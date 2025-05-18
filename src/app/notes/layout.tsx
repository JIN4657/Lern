import React from 'react';

// Layout component for notes section
export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="notes-layout">
      {/* Notes navigation can be added here */}
      <main className="notes-content">{children}</main>
    </div>
  );
} 