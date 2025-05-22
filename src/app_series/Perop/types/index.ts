// Type definitions for the Perop prompt manager project

export type Prompt = {
  id: string;
  title: string;
  content: string;
  description: string;
};

export type Segment = {
  type: 'text' | 'var';
  value: string;
}; 