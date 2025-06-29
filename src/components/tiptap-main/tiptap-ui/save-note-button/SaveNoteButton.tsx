"use client";

import { toast } from "sonner";
import { Button } from "@/components/tiptap-main/tiptap-ui-primitive/button";
import { SaveIcon } from "lucide-react"; // or your preferred icon

type SaveNoteButtonProps = {
  onClick: () => Promise<void>;
};

export function SaveNoteButton({ onClick }: SaveNoteButtonProps) {
  return (
    <Button onClick={() => {
      toast.promise(onClick(), {
        loading: "Saving...",
        success: "Note saved!",
        error: "Failed to save note.",
      });
    }}>
      <SaveIcon className="tiptap-button-icon" />
      Save
    </Button>
  );
}
