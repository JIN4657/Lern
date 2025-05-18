/**
 * Format a date string into a user-friendly format
 * @param dateStr - ISO date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { 
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });
};

/**
 * Format a due date string in a user-friendly way, showing "Today" or "Tomorrow" when applicable
 * @param dateStr - ISO date string to format
 * @returns Formatted due date string
 */
export const formatDueDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

/**
 * Check if a date is within the next 3 days
 * @param dateStr - ISO date string to check
 * @returns Boolean indicating if the date is due soon
 */
export const isDueSoon = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 3 && diffDays >= 0;
};

/**
 * Check if a date is in the past
 * @param dateStr - ISO date string to check
 * @returns Boolean indicating if the date is overdue
 */
export const isOverdue = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const now = new Date();
  return date < now;
}; 