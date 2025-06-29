"use client";

import * as React from "react";
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

// --- Components ---
import { ThemeToggle } from "@/components/tiptap-main/tiptap-templates/simple/theme-toggle";

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

      <ToolbarGroup>
        <ThemeToggle />
      </ToolbarGroup>
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
  const [mobileView, setMobileView] = React.useState<"main" | "highlighter" | "link">("main");
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const saveTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

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

  try {
    const html = editor.getHTML();

    await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Note",
        content: html,
      }),
    });

    if (!silent) {
      // manual save — handled via toast.promise in SaveNoteButton
      return;
    } else {
      // silent auto-save — just show background toast
      toast.success("Auto-saved", { duration: 2000 });
    }
  } catch (err) {
    console.error("Save failed:", err);
    if (!silent) {
      // handled in SaveNoteButton toast.promise
      return;
    } else {
      toast.error("Auto-save failed", { duration: 2000 });
    }
  }
};

  // AUTO-SAVE ON IDLE
  React.useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(async () => {
        setIsSaving(true);
        await handleSave(true); // silent auto-save
        setIsSaving(false);
      }, 2000);
    };

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [editor]);

  // DOWNLOAD FUNCTION
  const handleDownload = () => {
    if (!editor) return;

    const contentHTML = editor.getHTML();
    const container = document.createElement("div");
    container.innerHTML = contentHTML;

    import("html2pdf.js").then((html2pdf) => {
      html2pdf.default().from(container).save("note.pdf");
    });
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
