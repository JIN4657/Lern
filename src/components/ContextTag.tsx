import React from "react";

interface ContextTagProps {
  label: string;
  color: string;
  size?: "small" | "medium";
}

/**
 * Displays a colored tag showing a context label (subject, project, etc)
 */
export const ContextTag = ({ label, color, size = "medium" }: ContextTagProps) => {
  const paddingClass = size === "small" ? "px-2 py-0.5" : "px-3 py-1";
  const textSize = size === "small" ? "text-xs" : "text-sm";

  return (
    <span
      className={`${paddingClass} rounded-full ${textSize} font-medium`}
      style={{
        backgroundColor: `${color}15`,
        color: color,
      }}
    >
      {label}
    </span>
  );
}; 