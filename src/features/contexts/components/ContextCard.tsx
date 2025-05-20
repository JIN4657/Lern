import React from 'react';
import { Context } from '@/types';

type ContextCardProps = {
  context: Context;
  onClick?: () => void; // Optional click handler
};

// ContextCard: Displays a context with color indicator at the top and name.
const ContextCard: React.FC<ContextCardProps> = ({ context, onClick }) => (
  <div
    className="w-36 h-32 flex flex-col relative rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden bg-white dark:bg-neutral-900 select-none cursor-pointer"
    onClick={onClick}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    aria-pressed={onClick ? false : undefined}
  >
    {/* Top color bar using context color with rounded top corners */}
    <div
      className="h-[38%] rounded-t-2xl"
      style={{ backgroundColor: context.color }}
    />
    {/* Name section with larger text and clamped to two lines */}
    <div className="h-[62%] flex items-start px-4 pt-2 pb-3">
      <span
        className="text-left font-semibold text-neutral-900 dark:text-neutral-100 text-lg leading-tight w-full line-clamp-2"
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden',
        }}
      >
        {context.name}
      </span>
    </div>
  </div>
);

export default ContextCard; 