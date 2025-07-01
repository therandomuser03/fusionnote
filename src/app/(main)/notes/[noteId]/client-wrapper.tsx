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

interface Note {
  title: string;
  content: JSONContent;
}

interface NoteClientPageProps {
  noteId: string;
}

export default function NoteClientPage({ noteId }: NoteClientPageProps) {
  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!noteId) {
      setError("Note ID is required");
      setIsLoading(false);
      return;
    }

    const fetchNote = async () => {
      setIsLoading(true);
      setNote(null);
      setError(null);
      
      try {
        const res = await fetch(`/api/notes/${noteId}`);
        
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Note not found");
          }
          if (res.status === 403) {
            throw new Error("You don't have permission to view this note");
          }
          throw new Error(`Failed to fetch note: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        if (!data) {
          throw new Error("No data received from server");
        }

        // Handle content parsing more safely
        let parsedContent: JSONContent;
        try {
          parsedContent = typeof data.content === "string" 
            ? JSON.parse(data.content) 
            : data.content;
        } catch (parseError) {
          console.error("Failed to parse note content:", parseError);
          throw new Error("Invalid note content format");
        }

        // Validate that parsedContent is valid JSONContent
        if (!parsedContent || typeof parsedContent !== 'object') {
          throw new Error("Invalid note content structure");
        }

        setNote({
          title: data.title || "Untitled",
          content: parsedContent,
        });
      } catch (err: unknown) {
        console.error("❌ Failed to fetch note:", err);
        
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred while loading the note");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  // Handle loading state
  if (isLoading) {
    return <EditorLoading />;
  }

  // Handle error state
  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Failed to Load Note
          </h2>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Handle case where note is still null (shouldn't happen with proper loading state)
  if (!note) {
    return <EditorLoading />;
  }

  return <NoteDisplay title={note.title} content={note.content} />;
}