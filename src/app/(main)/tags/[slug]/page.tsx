import { JSONContent } from "@tiptap/react";

type Note = {
  _id: string;
  title: string;
  content: JSONContent;
};

async function getNotesForTag(slug: string): Promise<Note[]> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/notes/by-tag`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tagNames: [slug.replace(/-/g, " ")] }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  return res.json();
}

// ✅ Don't type the props with a custom type — inline directly
export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const notes = await getNotesForTag(resolvedParams.slug);

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {resolvedParams.slug.replace(/-/g, " ")}
      </h1>

      {notes.length === 0 ? (
        <p className="text-gray-400">No notes found for this tag.</p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="p-4 border border-border rounded-md shadow-sm bg-muted text-white"
            >
              <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
              <pre className="text-sm text-gray-200">
                {JSON.stringify(note.content, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
