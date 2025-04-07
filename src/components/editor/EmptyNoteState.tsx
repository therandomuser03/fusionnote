
import React from 'react';
import { FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotes } from '@/context/NotesContext';

export const EmptyNoteState = () => {
  const { createNote } = useNotes();

  const handleCreateNote = () => {
    createNote('Untitled Note', '');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 text-center">
      <div className="mb-6">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <FileText className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">No note selected</h3>
        <p className="text-muted-foreground max-w-md">
          Select an existing note from the sidebar or create a new one to get started with your writing.
        </p>
      </div>
      
      <Button 
        onClick={handleCreateNote}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Create a new note
      </Button>
      
      <div className="mt-8 grid gap-4 text-sm text-muted-foreground">
        <div className="bg-muted/40 p-4 rounded-lg max-w-md">
          <h4 className="font-medium mb-2">Keyboard shortcuts</h4>
          <ul className="grid gap-2">
            <li className="flex items-center justify-between">
              <span>Save</span>
              <kbd className="px-2 py-0.5 bg-background rounded border text-xs">Ctrl+S</kbd>
            </li>
            <li className="flex items-center justify-between">
              <span>Bold</span>
              <kbd className="px-2 py-0.5 bg-background rounded border text-xs">Ctrl+B</kbd>
            </li>
            <li className="flex items-center justify-between">
              <span>Italic</span>
              <kbd className="px-2 py-0.5 bg-background rounded border text-xs">Ctrl+I</kbd>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
