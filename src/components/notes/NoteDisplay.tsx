"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";

interface NoteDisplayProps {
  title: string;
  content: any;
}

export default function NoteDisplay({ title, content }: NoteDisplayProps) {
  // Console logs are good for debugging, you can remove them after confirming
  // everything works as expected if you prefer a cleaner console.
  console.log("NoteDisplay received title:", title);
  console.log("NoteDisplay received content:", content);
  console.log("Type of content:", typeof content);
  if (typeof content === 'object' && content !== null) {
    console.log("Is content empty object?", Object.keys(content).length === 0);
    console.log("Content keys:", Object.keys(content));
    console.log("Content.type:", content.type);
    console.log("Content.content array length:", content.content?.length);
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: content,
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        // 💡 Adjusted for dark theme:
        // Use prose-invert for dark background, or prose-dark if you have a custom dark typography config.
        // prose-invert flips the colors for a dark background
        // Removed `text-black` here as `prose-invert` handles text color
        class: "prose prose-lg prose-invert max-w-none focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      console.log("TipTap Editor initialized.");
      console.log("Editor JSON content:", editor.getJSON());
    }
  }, [editor]);

  if (!editor) {
    return <p className="text-center text-gray-500">Loading editor...</p>;
  }

  return (
    // 💡 Adjusted for dark theme:
    // The main container background will typically be dark from the parent layout.
    // Ensure this div also has dark background and light text.
    <main className="max-w-3xl mx-auto p-8 bg-background text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-100">{title}</h1>
      <div className="bg-neutral-900 text-gray-100 p-4 border border-neutral-700 rounded-md shadow-lg">
        <EditorContent editor={editor} />
      </div>
    </main>
  );
}