import React from 'react';

interface PageProps {
  params: {
    noteId: string;
  };
}

export default function NotePage({ params }: PageProps) {
  const { noteId } = params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Note ID: {noteId}</h1>
      <p>This is a dynamic route page for a specific note.</p>
    </div>
  );
}
