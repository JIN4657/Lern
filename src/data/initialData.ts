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
    contextId: "s1",
    content: "# Data Structures\n\n## Binary Trees\nA binary tree is a tree data structure in which each node has at most two children.\n\n### Key Concepts\n- Root node\n- Left child\n- Right child\n- Leaf nodes\n\n### Common Operations\n1. Insertion\n2. Deletion\n3. Traversal\n   - Inorder\n   - Preorder\n   - Postorder",
    lastModified: new Date().toISOString(),
  },
  {
    id: "n2",
    title: "Calculus Fundamentals",
    contextId: "s2",
    content: "# Calculus Fundamentals\n\n## Derivatives\n- Rate of change\n- Slope of tangent line\n- Basic rules\n  - Power rule\n  - Product rule\n  - Chain rule\n\n## Integrals\n- Area under curve\n- Antiderivatives\n- Integration techniques\n  - Substitution\n  - By parts",
    lastModified: new Date().toISOString(),
  },
  {
    id: "n3",
    title: "Binary Tree Implementation Notes",
    contextId: "s1",
    content: "# Implementation Notes\n\n- Use a Node class with left and right pointers\n- Implement recursive traversal methods\n- Consider edge cases like empty trees\n- Test with various tree shapes",
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
    priority: 'high',
  },
  {
    id: "a2",
    title: "Calculus Problem Set",
    contextId: "s2",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    description: "Complete problems 1-10 from Chapter 3",
    completed: false,
    priority: 'medium',
  },
]; 