"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { JSONContent } from "@/types/tiptap";

const EditorLoading = () => (
  <div className="max-w-3xl mx-auto p-8">
    <div className="space-y-4">
      <div className="animate-pulse bg-gray-300 rounded h-8 w-3/4 mb-6"></div>
      <div className="animate-pulse bg-gray-300 rounded h-64 w-full"></div>
    </div>
  </div>
);

const NoteDisplay = dynamic(() => import("@/components/notes/NoteDisplay"), {
  ssr: false,
  loading: () => <EditorLoading />,
});

export default function NoteClientPage({ noteId }: { noteId: string }) {
  const [note, setNote] = useState<{
    title: string;
    content: JSONContent;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!noteId) return;

    const fetchNote = async () => {
      setNote(null);
      setError(null);
      try {
        const res = await fetch(`/api/notes/${noteId}`); // Ensure this is hitting the [id] route
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch the note.");
        }

        if (!data || !data.content) {
          throw new Error("Invalid note data received from the server.");
        }

        const parsedContent =
          typeof data.content === "string"
            ? JSON.parse(data.content)
            : data.content;

        setNote({
          title: data.title || "Untitled",
          content: parsedContent,
        });
      } catch (err: unknown) {
        console.error("❌ Fetch or parsing failed:", err);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    fetchNote();
  }, [noteId]);

  if (error) {
    return <p className="p-8 text-center text-red-500">Error: {error}</p>;
  }

  if (!note) {
    return <EditorLoading />;
  }

  return <NoteDisplay title={note.title} content={note.content} />;
}
