
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import { useNotes } from '@/context/NotesContext';
import { useState, useEffect, useCallback } from 'react';
import { EditorHeader } from './editor/EditorHeader';
import { EditorToolbar } from './editor/EditorToolbar';
import { EmptyNoteState } from './editor/EmptyNoteState';
import { toast } from 'sonner';
import { useHotkeys } from 'react-hotkeys-hook';

const NoteEditor = () => {
  const { currentNote, updateNote } = useNotes();
  const [title, setTitle] = useState(currentNote?.title || 'Untitled Note');
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing your note here...',
      }),
      Image,
    ],
    content: currentNote?.content || '',
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none p-4 h-full outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      // This triggers the autosave debounce
      handleContentChange(editor.getHTML());
    },
  });

  // Debounced save function
  const debouncedSave = useCallback(
    // Using a basic debounce implementation
    (() => {
      let timeout: ReturnType<typeof setTimeout>;
      return (content: string) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (currentNote && editor) {
            updateNote(currentNote.id, title, content);
            setLastSavedAt(new Date());
          }
        }, 2000); // 2 second delay
      };
    })(),
    [currentNote, editor, title, updateNote]
  );

  const handleContentChange = useCallback(
    (content: string) => {
      debouncedSave(content);
    },
    [debouncedSave]
  );

  // Update title with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentNote && editor && title !== currentNote.title) {
        updateNote(currentNote.id, title, editor.getHTML());
        setLastSavedAt(new Date());
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [title, editor, currentNote, updateNote]);

  // Update editor content when currentNote changes
  useEffect(() => {
    if (editor && currentNote) {
      editor.commands.setContent(currentNote.content || '');
      setTitle(currentNote.title || 'Untitled Note');
    }
  }, [currentNote, editor]);

  // Keyboard shortcuts
  useHotkeys('mod+s', (e) => {
    e.preventDefault();
    if (currentNote && editor) {
      updateNote(currentNote.id, title, editor.getHTML());
      setLastSavedAt(new Date());
      toast.success('Note saved');
    }
  });

  useHotkeys('mod+b', (e) => {
    e.preventDefault();
    editor?.chain().focus().toggleBold().run();
  });

  useHotkeys('mod+i', (e) => {
    e.preventDefault();
    editor?.chain().focus().toggleItalic().run();
  });

  if (!currentNote || !editor) {
    return <EmptyNoteState />;
  }

  return (
    <div className="flex flex-col h-full bg-card dark:bg-card rounded-md shadow-sm border">
      <EditorHeader 
        title={title}
        setTitle={setTitle}
        editor={editor}
        lastSavedAt={lastSavedAt}
      />
      
      <EditorToolbar editor={editor} />
      
      <div className="flex-1 overflow-auto bg-card dark:bg-card">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
};

export default NoteEditor;
