"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Underline } from "@tiptap/extension-underline";

// --- Custom Extensions ---
import { Link } from "@/components/tiptap-main/tiptap-extension/link-extension";
import { Selection } from "@/components/tiptap-main/tiptap-extension/selection-extension";
import { TrailingNode } from "@/components/tiptap-main/tiptap-extension/trailing-node-extension";

// --- UI Primitives ---
import { Button } from "@/components/tiptap-main/tiptap-ui-primitive/button";
import { Spacer } from "@/components/tiptap-main/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-main/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-main/tiptap-node/image-upload-node/image-upload-node-extension";
import "@/components/tiptap-main/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-main/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-main/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-main/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-main/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-main/tiptap-ui/image-upload-button";
import { SaveNoteButton } from "../../tiptap-ui/save-note-button/SaveNoteButton";
import { DownloadNoteButton } from "../../tiptap-ui/download-note-button/DownloadNoteButton";
import { ListDropdownMenu } from "@/components/tiptap-main/tiptap-ui/list-dropdown-menu";
import { BlockQuoteButton } from "@/components/tiptap-main/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-main/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/tiptap-main/tiptap-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-main/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-main/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-main/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-main/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-main/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-main/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-main/tiptap-icons/link-icon";

// --- Hooks ---
import { useMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-main/tiptap-templates/simple/simple-editor.scss";

import content from "@/components/tiptap-main/tiptap-templates/simple/data/content.json";
import { toast } from "sonner";

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
  onSaveClick,
  onDownloadClick,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
  onSaveClick: () => Promise<void>;
  onDownloadClick: () => void;
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
        <BlockQuoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
        <SaveNoteButton onClick={onSaveClick} />
        <DownloadNoteButton onClick={onDownloadClick} />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

export function SimpleEditor() {
  const isMobile = useMobile();
  const windowSize = useWindowSize();
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main");
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const saveTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [title, setTitle] = React.useState("Untitled Note");
  const params = useParams();
  const [noteId, setNoteId] = React.useState<string | null>(null);
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      TrailingNode,
      Link.configure({ openOnClick: false }),
    ],
    content: content,
  });

  // SAVE FUNCTION
  const handleSave = async (silent = false) => {
    if (!editor) return;

    const html = editor.getJSON();

    if (!title.trim()) {
      toast.error("Please enter a title.");
      return;
    }

    try {
      const method = noteId ? "PUT" : "POST";
      const url = "/api/notes";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: noteId,
          title,
          content: html,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save note");
      }

      const data = await res.json();

      if (!noteId && data._id) {
        setNoteId(data._id);
      }

      if (!silent) return;
      toast.success("Auto-saved", { duration: 2000 });
    } catch (err) {
      console.error("Save failed:", err);
      if (!silent) {
        return;
      } else {
        toast.error("Auto-save failed", { duration: 2000 });
      }
    }
  };

  // AUTO-SAVE ON IDLE
  React.useEffect(() => {
    if (!params?.id || !editor) return;

    const fetchNote = async () => {
      try {
        const res = await fetch(`/api/notes?id=${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch note");

        const data = await res.json();
        setTitle(data.title);
        setNoteId(data._id);
        editor.commands.setContent(data.content || "");
      } catch (err) {
        console.error(err);
        toast.error("Could not load note.");
      }
    };

    fetchNote();
  }, [params?.id, editor]);

  // DOWNLOAD FUNCTION
  const handleDownload = async () => {
  if (!noteId) {
    toast.error("Note not saved yet.");
    return;
  }

  toast("Started converting to PDF");

  try {
    const res = await fetch(`/api/notes/pdf?id=${noteId}`);
    if (!res.ok) throw new Error("Failed to generate PDF");

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${title || "note"}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
    toast.success("PDF downloaded.");
  } catch (err) {
    console.error("Download failed:", err);
    toast.error("Failed to download note.");
  }
};

  const bodyRect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  return (
    <EditorContext.Provider value={{ editor }}>
      <div style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title..."
          className="note-title-input"
          style={{
            width: "100%",
            fontSize: "1.5rem",
            fontWeight: "bold",
            border: "none",
            outline: "none",
            background: "transparent",
          }}
        />
      </div>
      <Toolbar
        ref={toolbarRef}
        style={
          isMobile
            ? {
                bottom: `calc(100% - ${windowSize.height - bodyRect.y}px)`,
              }
            : {}
        }
      >
        {mobileView === "main" ? (
          <MainToolbarContent
            onHighlighterClick={() => setMobileView("highlighter")}
            onLinkClick={() => setMobileView("link")}
            isMobile={isMobile}
            onSaveClick={handleSave}
            onDownloadClick={handleDownload}
          />
        ) : (
          <MobileToolbarContent
            type={mobileView === "highlighter" ? "highlighter" : "link"}
            onBack={() => setMobileView("main")}
          />
        )}
      </Toolbar>

      <div className="content-wrapper">
        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </div>
    </EditorContext.Provider>
  );
}
