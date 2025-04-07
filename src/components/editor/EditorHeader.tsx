
import React from 'react';
import { Save, Trash, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useNotes } from '@/context/NotesContext';
import { Editor } from '@tiptap/react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type EditorHeaderProps = {
  title: string;
  setTitle: (title: string) => void;
  editor: Editor | null;
  lastSavedAt: Date | null;
};

export const EditorHeader = ({ title, setTitle, editor, lastSavedAt }: EditorHeaderProps) => {
  const { currentNote, updateNote, deleteNote } = useNotes();

  const handleSave = () => {
    if (currentNote && editor) {
      updateNote(currentNote.id, title, editor.getHTML());
      toast.success("Note saved");
    }
  };

  const handleDelete = () => {
    if (currentNote) {
      deleteNote(currentNote.id);
      toast.success("Note deleted");
    }
  };

  const handleExport = () => {
    if (currentNote && editor) {
      // Create a blob with the content
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${title}</title>
          <meta charset="UTF-8">
        </head>
        <body>
          <h1>${title}</h1>
          ${editor.getHTML()}
        </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      // Create a download link
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.replace(/\s+/g, '-')}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Note exported as HTML");
    }
  };

  return (
    <div className="border-b p-2 bg-muted/20 dark:bg-muted/5">
      <div className="flex items-center gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-medium border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-auto py-1"
          placeholder="Note title"
        />
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleSave}>
                <Save className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Save note (Ctrl+S)</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <AlertDialog>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </AlertDialogTrigger>
              </TooltipTrigger>
              <TooltipContent>Delete note</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your note.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleExport}>
                <Share className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export note</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {lastSavedAt && (
        <div className="mt-1 pl-1">
          <span className="text-xs text-muted-foreground">
            {lastSavedAt ? `Auto-saved ${formatTimeAgo(lastSavedAt)}` : 'Not saved yet'}
          </span>
        </div>
      )}
    </div>
  );
};

// Helper function to format time ago
function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds} seconds ago`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes === 1) return 'a minute ago';
  if (minutes < 60) return `${minutes} minutes ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return 'an hour ago';
  
  return `${hours} hours ago`;
}
