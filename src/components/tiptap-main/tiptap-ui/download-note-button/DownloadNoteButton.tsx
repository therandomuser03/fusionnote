"use client";

import { Button } from "@/components/tiptap-main/tiptap-ui-primitive/button";
import { DownloadIcon } from "lucide-react"; // or your preferred icon

type DownloadNoteButtonProps = {
  onClick: () => void;
};

export function DownloadNoteButton({ onClick }: DownloadNoteButtonProps) {
  return (
    <Button onClick={onClick}>
      <DownloadIcon className="tiptap-button-icon" />
      Download
    </Button>
  );
}
