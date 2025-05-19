import { Note, Context, Assignment } from "@/types";

// Initial contexts data
export const initialContexts: Context[] = [
  { id: "s1", name: "Computer Science", color: "#FF5630" },
  { id: "s2", name: "Mathematics", color: "#36B37E" },
  { id: "s3", name: "Physics", color: "#6554C0" },
];

// Initial notes data
export const initialNotes: Note[] = [
  {
    id: "n1",
    title: "Data Structures",
    emoji: "🌳",
    contextId: "s1",
    content: {
      type: 'doc',
      content: [
        { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Data Structures' }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Binary Trees' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'A binary tree is a tree data structure in which each node has at most two children.' }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'Key Concepts' }] },
        { type: 'bulletList', content: [
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Root node' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Left child' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Right child' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Leaf nodes' }] }] },
        ] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'Common Operations' }] },
        { type: 'orderedList', content: [
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Insertion' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Deletion' }] }] },
          { type: 'listItem', content: [
            { type: 'paragraph', content: [{ type: 'text', text: 'Traversal' }] },
            { type: 'bulletList', content: [
              { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Inorder' }] }] },
              { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Preorder' }] }] },
              { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Postorder' }] }] },
            ] },
          ] },
        ] },
      ],
    },
    lastModified: new Date().toISOString(),
  },
  {
    id: "n2",
    title: "Calculus Fundamentals",
    emoji: "🔢",
    contextId: "s2",
    content: {
      type: 'doc',
      content: [
        { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Calculus Fundamentals' }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Derivatives' }] },
        { type: 'bulletList', content: [
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Rate of change' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Slope of tangent line' }] }] },
          { type: 'listItem', content: [
            { type: 'paragraph', content: [{ type: 'text', text: 'Basic rules' }] },
            { type: 'bulletList', content: [
              { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Power rule' }] }] },
              { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Product rule' }] }] },
              { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Chain rule' }] }] },
            ] },
          ] },
        ] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Integrals' }] },
        { type: 'bulletList', content: [
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Area under curve' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Antiderivatives' }] }] },
          { type: 'listItem', content: [
            { type: 'paragraph', content: [{ type: 'text', text: 'Integration techniques' }] },
            { type: 'bulletList', content: [
              { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Substitution' }] }] },
              { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'By parts' }] }] },
            ] },
          ] },
        ] },
      ],
    },
    lastModified: new Date().toISOString(),
  },
  {
    id: "n3",
    title: "Binary Tree Implementation Notes",
    emoji: "🌳",
    contextId: "s1",
    content: {
      type: 'doc',
      content: [
        { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Implementation Notes' }] },
        { type: 'bulletList', content: [
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Use a Node class with left and right pointers' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Implement recursive traversal methods' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Consider edge cases like empty trees' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Test with various tree shapes' }] }] },
        ] },
      ],
    },
    lastModified: new Date().toISOString(),
    assignmentId: "a1", // This note is associated with the first assignment
  },
];

// Initial assignments data
export const initialAssignments: Assignment[] = [
  {
    id: "a1",
    title: "Binary Tree Implementation",
    contextId: "s1",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    description: "Implement a binary tree with insertion, deletion, and traversal methods",
    completed: false,
  },
  {
    id: "a2",
    title: "Calculus Problem Set",
    contextId: "s2",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    description: "Complete problems 1-10 from Chapter 3",
    completed: false,},
]; 