import React from 'react';
import ContextView from '@/views/FocusContext/ContextView';
import { initialContexts } from '@/data/initialData';

interface PageProps {
  params: {
    contextId: string;
  };
}

// Page: Dynamic context page that fetches the context and renders the ContextView.
export default function Page({ params }: PageProps) {
  const context = initialContexts.find((ctx) => ctx.id === params.contextId);
  if (!context) {
    return <div>Context not found</div>;
  }
  return <ContextView context={context} />;
} 