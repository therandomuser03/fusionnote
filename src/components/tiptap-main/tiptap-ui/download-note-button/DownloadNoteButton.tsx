"use client";

import * as React from "react"; // Import React
import { Button, type ButtonProps } from "@/components/tiptap-main/tiptap-ui-primitive/button"; // Import ButtonProps
import { DownloadIcon } from "lucide-react";

export interface DownloadNoteButtonProps extends ButtonProps { // Extend ButtonProps
  onClick: () => void;
  text?: string; // Add optional text prop
}

export const DownloadNoteButton = React.forwardRef< // Use React.forwardRef
  HTMLButtonElement,
  DownloadNoteButtonProps
>(
  (
    {
      onClick,
      text, // Destructure text prop
      className = "", // Destructure className
      disabled, // Destructure disabled
      children, // Destructure children
      ...buttonProps // Capture remaining button props
    },
    ref
  ) => {
    const handleClick = React.useCallback(
      (_e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        onClick();
      },
      [onClick, disabled]
    );

    return (
      <Button
        ref={ref} // Forward the ref
        type="button"
        className={className.trim()}
        data-style="ghost" // Consistent data-style, assuming ghost for toolbar buttons
        role="button"
        tabIndex={-1}
        aria-label="Download note" // Add aria-label
        tooltip="Download note" // Add tooltip
        onClick={handleClick}
        disabled={disabled} // Pass disabled prop
        {...buttonProps} // Spread remaining button props
      >
        {children || ( // Render children or default content
          <>
            <DownloadIcon className="tiptap-button-icon" />
            {text && <span className="tiptap-button-text">{text}</span>}
            {!text && !children && <span className="tiptap-button-text">Download</span>} {/* Default "Download" text if no text or children */}
          </>
        )}
      </Button>
    );
  }
);

DownloadNoteButton.displayName = "DownloadNoteButton"; // Add display name