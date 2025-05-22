import { Prompt } from '../types';

// Stubbed prompt storage service
const STORAGE_KEY = 'perop_prompts';

// Load prompts from localStorage
export function loadPrompts(): Prompt[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Save prompts to localStorage
export function savePrompts(prompts: Prompt[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
  } catch {}
} 