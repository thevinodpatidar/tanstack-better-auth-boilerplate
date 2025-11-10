"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface OrganizationAvatarProps {
  orgId: string;
  orgName: string;
  className?: string;
  fallbackClassName?: string;
  size?: "sm" | "md" | "lg";
  shape?: "square" | "circle";
  border?: boolean;
}

// Improved hash function for better distribution
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Function to generate consistent colors based on string
function getColorStyles(str: string) {
  const hash = hashCode(str);

  // List of vibrant background colors for light mode
  const bgColors = [
    "dark:bg-blue-300 bg-blue-600",
    "dark:bg-purple-300 bg-purple-600",
    "dark:bg-pink-300 bg-pink-600",
    "dark:bg-orange-300 bg-orange-600",
    "dark:bg-green-300 bg-green-600",
    "dark:bg-teal-300 bg-teal-600",
    "dark:bg-cyan-300 bg-cyan-600",
    "dark:bg-red-300 bg-red-600",
    "dark:bg-yellow-300 bg-yellow-600",
    "dark:bg-indigo-300 bg-indigo-600",
  ];

  // List of matching text colors
  const textColors = [
    "dark:text-blue-800 text-blue-100",
    "dark:text-purple-800 text-purple-100",
    "dark:text-pink-800 text-pink-100",
    "dark:text-orange-800 text-orange-100",
    "dark:text-green-800 text-green-100",
    "dark:text-teal-800 text-teal-100",
    "dark:text-cyan-800 text-cyan-100",
    "dark:text-red-800 text-red-100",
    "dark:text-yellow-800 text-yellow-100",
    "dark:text-indigo-800 text-indigo-100",
  ];

  // List of matching border colors
  const borderColors = [
    "border-blue-200 dark:border-blue-700",
    "border-purple-200 dark:border-purple-700",
    "border-pink-200 dark:border-pink-700",
    "border-orange-200 dark:border-orange-700",
    "border-green-200 dark:border-green-700",
    "border-teal-200 dark:border-teal-700",
    "border-cyan-200 dark:border-cyan-700",
    "border-red-200 dark:border-red-700",
    "border-yellow-200 dark:border-yellow-700",
    "border-indigo-200 dark:border-indigo-700",
  ];

  const index = hash % bgColors.length;

  return {
    background: bgColors[index],
    text: textColors[index],
    border: borderColors[index],
  };
}

// Function to get initials from organization name
function getInitials(name: string): string {
  const cleanName = name.trim();

  // If empty string, return default
  if (!cleanName) return "??";

  // For single word
  if (!cleanName.includes(" ")) {
    // If word is 1 character, duplicate it
    if (cleanName.length === 1) {
      return cleanName.toUpperCase().repeat(2);
    }
    // If word is 2+ characters, take first two
    return cleanName.slice(0, 2).toUpperCase();
  }

  // For multiple words, take first letter of first two words
  return cleanName
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function OrganizationAvatar({
  orgId,
  orgName,
  className,
  fallbackClassName,
  size = "sm",
  shape = "square",
  border = false,
}: OrganizationAvatarProps) {
  const colorStyles = useMemo(() => getColorStyles(orgId), [orgId]);
  const initials = useMemo(() => {
    if (!orgName) return "UA";
    return getInitials(orgName);
  }, [orgName]);

  const sizeClasses = {
    sm: "h-6 w-6 text-[10px]",
    md: "h-8 w-8 text-sm",
    lg: "h-9 w-9 text-base",
  };

  const paddingClasses = {
    sm: "p-0.5",
    md: "p-1",
    lg: "p-1",
  };

  return (
    <Avatar
      className={cn(
        sizeClasses[size],
        shape === "square" && "rounded-[4px]",
        border && cn("ring-1 ring-border border", colorStyles.border),
        "select-none",
        className
      )}
    >
      <AvatarFallback
        className={cn(
          colorStyles.background,
          colorStyles.text,
          "font-medium transition-colors flex items-center justify-center",
          paddingClasses[size],
          shape === "square" && "rounded-[4px]",
          fallbackClassName
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
