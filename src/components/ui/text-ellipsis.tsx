"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { cn } from "@/lib/utils";

interface TextEllipsisProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string;
  maxWords?: number;
  showTooltip?: boolean;
  width?: string | number | { [key: string]: string | number };
}

const TextEllipsis = React.forwardRef<HTMLDivElement, TextEllipsisProps>(
  (
    { children, maxWords, showTooltip = true, className, width, ...props },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isTruncated, setIsTruncated] = React.useState(false);

    React.useEffect(() => {
      const checkTruncation = () => {
        if (containerRef.current) {
          const element = containerRef.current;
          setIsTruncated(
            element.scrollWidth > element.clientWidth ||
              element.scrollHeight > element.clientHeight
          );
        }
      };

      const observer = new ResizeObserver(checkTruncation);
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      // Initial check
      checkTruncation();

      return () => {
        observer.disconnect();
      };
    }, [children]);

    const getWidthStyles = () => {
      if (!width) return {};
      if (typeof width === "string" || typeof width === "number") {
        return {
          maxWidth: typeof width === "number" ? `${width}px` : width,
          width: "fit-content",
        };
      }
      return Object.entries(width).reduce(
        (acc, [breakpoint, value]) => {
          acc[`@media (min-width: ${breakpoint}px)`] = {
            maxWidth: typeof value === "number" ? `${value}px` : value,
            width: "fit-content",
          };
          return acc;
        },
        {} as Record<string, { maxWidth: string; width: string }>
      );
    };

    const text = maxWords
      ? children.split(" ").slice(0, maxWords).join(" ") + "..."
      : children;

    const content = (
      <div
        ref={containerRef}
        className={cn("overflow-hidden", "truncate", className)}
        style={{
          ...getWidthStyles(),
        }}
        {...props}
      >
        {text}
      </div>
    );

    if (!showTooltip || !isTruncated) {
      return content;
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="top" align="start">
            <p className="text-xs">{children}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

TextEllipsis.displayName = "TextEllipsis";

export { TextEllipsis };
