// Use a dedicated client component for Stagewise toolbar integration
"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the StagewiseToolbar component, disabling SSR
const StagewiseToolbar = dynamic(
  () => import('@stagewise/toolbar-next').then((mod) => mod.StagewiseToolbar),
  { ssr: false }
);

// Basic Stagewise configuration; extend with plugins as needed
const stagewiseConfig = {
  plugins: []
};

/**
 * StagewiseToolbarClient
 * Renders the Stagewise toolbar only in development mode to avoid shipping it in production.
 */
export default function StagewiseToolbarClient() {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  return <StagewiseToolbar config={stagewiseConfig} />;
} 