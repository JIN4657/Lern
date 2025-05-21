import React from 'react';
import { Context } from '@/types';
import ContextCard from './ContextCard';

type ContextMenuProps = {
  contexts: Context[];
  onSelect: (context: Context) => void;
};

// ContextMenu: Renders a horizontal scrollable row of ContextCard components for selection, similar to RecentNote.
const ContextMenu: React.FC<ContextMenuProps> = ({ contexts, onSelect }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 ml-6 mb-4 md:ml-30">Contexts</h3>
      {/* Horizontal scrollable row of context cards with edge padding */}
      <div className="flex flex-row overflow-x-auto space-x-4 pb-2 hide-scrollbar pl-6 pr-6 md:pl-30 md:pr-30">
        {contexts.map((ctx) => (
          <div key={ctx.id} className="flex-shrink-0">
            <ContextCard context={ctx} onClick={() => onSelect(ctx)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContextMenu; 