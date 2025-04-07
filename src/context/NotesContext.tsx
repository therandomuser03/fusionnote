
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

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
  loading: boolean;
  createNote: (title: string, content: string) => Promise<void>;
  updateNote: (id: string, title: string, content: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  setCurrentNote: (note: Note | null) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Use a more efficient approach for fetchNotes
  const fetchNotes = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
      
      // Set current note to the most recent note if available
      if (data && data.length > 0 && !currentNote) {
        setCurrentNote(data[0]);
      }
    } catch (error: any) {
      toast.error("Error fetching notes", {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  }, [user, currentNote]);

  useEffect(() => {
    if (user) {
      fetchNotes();
      
      // Set up real-time subscription for collaborative editing
      const notesSubscription = supabase
        .channel('notes_changes')
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'notes',
          filter: `user_id=eq.${user.id}`
        }, (payload) => {
          // Handle different events
          if (payload.eventType === 'INSERT') {
            const newNote = payload.new as Note;
            setNotes(prevNotes => [newNote, ...prevNotes]);
          } 
          else if (payload.eventType === 'UPDATE') {
            const updatedNote = payload.new as Note;
            setNotes(prevNotes => 
              prevNotes.map(note => 
                note.id === updatedNote.id ? updatedNote : note
              )
            );
            
            // Update currentNote if it's the one being updated from another session
            if (currentNote?.id === updatedNote.id) {
              setCurrentNote(updatedNote);
            }
          }
          else if (payload.eventType === 'DELETE') {
            const deletedNoteId = payload.old.id;
            setNotes(prevNotes => 
              prevNotes.filter(note => note.id !== deletedNoteId)
            );
            
            // If the deleted note was the current note, set currentNote to the first available note
            if (currentNote?.id === deletedNoteId) {
              setCurrentNote(prevNotes => 
                prevNotes.filter(note => note.id !== deletedNoteId)[0] || null
              );
            }
          }
        })
        .subscribe();

      return () => {
        supabase.removeChannel(notesSubscription);
      };
    } else {
      setNotes([]);
      setCurrentNote(null);
    }
  }, [user, fetchNotes, currentNote]);

  const createNote = async (title: string, content: string) => {
    try {
      const newNote = {
        title,
        content,
        user_id: user?.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('notes')
        .insert([newNote])
        .select();

      if (error) throw error;

      if (data) {
        setNotes([data[0], ...notes]);
        setCurrentNote(data[0]);
        toast.success("Note created");
      }
    } catch (error: any) {
      toast.error("Error creating note", {
        description: error.message
      });
    }
  };

  const updateNote = async (id: string, title: string, content: string) => {
    try {
      const { error } = await supabase
        .from('notes')
        .update({
          title,
          content,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      const updatedNotes = notes.map(note =>
        note.id === id
          ? { ...note, title, content, updated_at: new Date().toISOString() }
          : note
      );
      
      // Sort notes by updated_at (most recent first)
      updatedNotes.sort((a, b) => 
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      
      setNotes(updatedNotes);
      
      // Update currentNote if it's the one being edited
      if (currentNote?.id === id) {
        setCurrentNote({ ...currentNote, title, content, updated_at: new Date().toISOString() });
      }
    } catch (error: any) {
      toast.error("Error updating note", {
        description: error.message
      });
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update local state
      const filteredNotes = notes.filter(note => note.id !== id);
      setNotes(filteredNotes);
      
      // If the deleted note was the current note, set currentNote to the first available note
      if (currentNote?.id === id) {
        setCurrentNote(filteredNotes.length > 0 ? filteredNotes[0] : null);
      }
      
      toast.success("Note deleted");
    } catch (error: any) {
      toast.error("Error deleting note", {
        description: error.message
      });
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        currentNote,
        loading,
        createNote,
        updateNote,
        deleteNote,
        setCurrentNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
