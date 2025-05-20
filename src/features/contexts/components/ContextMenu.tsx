import React, { useState, useRef, useEffect } from 'react';
import { Context } from '@/types';
import ContextCard from './ContextCard';
import { motion } from 'motion/react';

type ContextMenuProps = {
  contexts: Context[];
  onSelect: (context: Context) => void;
};

// ContextMenu: Renders a vertical menu (column) of ContextCard components for selection.
const ContextMenu: React.FC<ContextMenuProps> = ({ contexts, onSelect }) => {
  // Constants for card spacing
  const cardSpacing = 20; // px between cards
  // State and refs for scroll-based grouping
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 128; // px corresponding to h-32
  const threshold = itemHeight + cardSpacing;
  // Listen to scroll to update grouping offset
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const scrollTop = container.scrollTop;
      const newOffset = Math.floor(scrollTop / threshold);
      const maxOffset = Math.max(0, contexts.length - 4);
      const clamped = Math.min(Math.max(newOffset, 0), maxOffset);
      if (clamped !== offset) {
        setOffset(clamped);
      }
    };
    container.addEventListener('scroll', onScroll);
    // Initialize
    onScroll();
    return () => container.removeEventListener('scroll', onScroll);
  }, [contexts.length, offset, threshold]);

  return (
    // Fixed to the left, scrollable to show up to 4 cards, grouping extras
    <div
      ref={containerRef}
      className="fixed left-0 top-[15vh] p-4 z-50 max-h-[37rem] overflow-y-auto hide-scrollbar"
    >
      {contexts.length <= 4 ? (
        // No grouping needed
        contexts.map((ctx, idx) => (
          <motion.div
            key={ctx.id}
            style={{ zIndex: contexts.length - idx, marginBottom: idx !== contexts.length - 1 ? cardSpacing : 0 }}
          >
            <ContextCard context={ctx} onClick={() => onSelect(ctx)} />
          </motion.div>
        ))
      ) : (
        <>
          {/* Visible contexts including ungrouped extras based on scroll offset */}
          {contexts.slice(0, 4 + offset).map((ctx, idx) => (
            <motion.div
              key={ctx.id}
              style={{ zIndex: contexts.length - idx, marginBottom: idx !== contexts.length - 1 ? cardSpacing : 0 }}
            >
              <ContextCard context={ctx} onClick={() => onSelect(ctx)} />
            </motion.div>
          ))}
          {/* Folder grouping for remaining hidden contexts */}
          {contexts.length > 4 + offset && (
            <motion.div
              key="folder"
              style={{
                zIndex: contexts.length - (4 + offset),
                marginBottom: (4 + offset) !== contexts.length - 1 ? cardSpacing : 0,
              }}
            >
              <div className="relative w-36 h-32">
                {contexts.slice(4 + offset, 4 + offset + 3).map((ctx, i) => {
                  const scale = 1 - i * 0.05;
                  const opacity = 1 - i * 0.2;
                  const translateY = -8 * i;
                  return (
                    <motion.div
                      key={ctx.id}
                      className="absolute top-0 left-0"
                      style={{
                        transform: `translateY(${translateY}px) scale(${scale})`,
                        opacity,
                        zIndex: 3 - i,
                      }}
                      onClick={() => onSelect(ctx)}
                    >
                      <ContextCard context={ctx} />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default ContextMenu; 