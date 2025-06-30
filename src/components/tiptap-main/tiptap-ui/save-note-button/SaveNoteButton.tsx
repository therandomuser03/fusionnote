"use client";

import * as React from "react"; // Import React
import { toast } from "sonner";
import { Button, type ButtonProps } from "@/components/tiptap-main/tiptap-ui-primitive/button"; // Import ButtonProps
import { SaveIcon } from "lucide-react";

export interface SaveNoteButtonProps extends ButtonProps { // Extend ButtonProps
  onClick: () => Promise<void>;
  text?: string; // Add optional text prop
}

export const SaveNoteButton = React.forwardRef< // Use React.forwardRef
  HTMLButtonElement,
  SaveNoteButtonProps
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
        toast.promise(onClick(), {
          loading: "Saving...",
          success: "Note saved!",
          error: "Failed to save note.",
        });
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
        aria-label="Save note" // Add aria-label
        tooltip="Save note" // Add tooltip
        onClick={handleClick}
        disabled={disabled} // Pass disabled prop
        {...buttonProps} // Spread remaining button props
      >
        {children || ( // Render children or default content
          <>
            <SaveIcon className="tiptap-button-icon" />
            {text && <span className="tiptap-button-text">{text}</span>}
            {!text && !children && <span className="tiptap-button-text">Save</span>} {/* Default "Save" text if no text or children */}
          </>
        )}
      </Button>
    );
  }
);

SaveNoteButton.displayName = "SaveNoteButton"; // Add display name