import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

// Define types
export type Note = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
};

type NotesContextType = {
  notes: Note[];
  currentNote: Note | null;
  setCurrentNote: (note: Note | null) => void;
  createNote: (title: string, content: string) => void;
  updateNote: (id: string, title: string, content: string) => void;
  deleteNote: (id: string) => void;
};

// Create context
const NotesContext = createContext<NotesContextType | undefined>(undefined);

// Provider component
export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const { user } = useAuth();

  // Load notes from localStorage when component mounts or user changes
  useEffect(() => {
    if (user) {
      const storedNotes = localStorage.getItem(`fusionNote_notes_${user.id}`);
      if (storedNotes) {
        try {
          setNotes(JSON.parse(storedNotes));
        } catch (error) {
          console.error('Failed to parse stored notes:', error);
          setNotes([]);
        }
      }
      
      // Reset current note when user logs in or page refreshes
      setCurrentNote(null);
    } else {
      setNotes([]);
      setCurrentNote(null);
    }
  }, [user]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (user && notes.length > 0) {
      localStorage.setItem(`fusionNote_notes_${user.id}`, JSON.stringify(notes));
    }
  }, [notes, user]);

  // Create a new note
  const createNote = (title: string, content: string) => {
    if (!user) return;
    
    const newNote: Note = {
      id: `note_${Date.now()}`,
      title,
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: user.id,
    };
    
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNote(newNote);
  };

  // Update an existing note
  const updateNote = (id: string, title: string, content: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              title,
              content,
              updated_at: new Date().toISOString(),
            }
          : note
      )
    );
    
    // Also update currentNote if it's the one being edited
    if (currentNote && currentNote.id === id) {
      setCurrentNote({
        ...currentNote,
        title,
        content,
        updated_at: new Date().toISOString(),
      });
    }
  };

  // Delete a note
  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    
    // Clear currentNote if it's the one being deleted
    if (currentNote && currentNote.id === id) {
      setCurrentNote(null);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        currentNote,
        setCurrentNote,
        createNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

// Custom hook to use the notes context
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};