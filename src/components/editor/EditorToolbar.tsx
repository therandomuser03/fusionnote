import React from 'react';
import { 
  Bold, Italic, List, ListOrdered, Image as ImageIcon, 
  Heading1, Heading2, Code, X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Editor } from '@tiptap/react';
import { useNotes } from '@/context/NotesContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

type EditorToolbarProps = {
  editor: Editor | null;
};

export const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  const { setCurrentNote } = useNotes();

  if (!editor) {
    return null;
  }

  const handleCloseNote = () => {
    // Close the note by setting currentNote to null
    setCurrentNote(null);
  };

  return (
    <div className="border-b p-2 flex items-center gap-1 overflow-x-auto bg-muted/20 dark:bg-muted/5">
      <div className="flex items-center gap-1 mr-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`flex items-center gap-1 ${editor.isActive('bold') ? 'bg-muted' : ''}`}
              >
                <Bold className="h-4 w-4" />
                <span className="text-xs">Bold</span>
                <Badge variant="outline" className="ml-1 text-[10px] px-1 py-0 h-4">
                  Ctrl+B
                </Badge>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold (Ctrl+B)</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`flex items-center gap-1 ${editor.isActive('italic') ? 'bg-muted' : ''}`}
              >
                <Italic className="h-4 w-4" />
                <span className="text-xs">Italic</span>
                <Badge variant="outline" className="ml-1 text-[10px] px-1 py-0 h-4">
                  Ctrl+I
                </Badge>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic (Ctrl+I)</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="h-6 border-r mx-1"></div>
      
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}
              >
                <Heading1 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 1</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}
              >
                <Heading2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="h-6 border-r mx-1"></div>
      
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'bg-muted' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet list</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'bg-muted' : ''}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Numbered list</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="h-6 border-r mx-1"></div>
      
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? 'bg-muted' : ''}
              >
                <Code className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Code block</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const url = window.prompt('Enter the image URL');
                  if (url) {
                    editor.chain().focus().setImage({ src: url }).run();
                  }
                }}
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert image</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="ml-auto flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border text-[10px]">
            Ctrl+S
          </kbd>
          <span className="ml-1">to save</span>
        </span>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCloseNote}
                className="ml-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Close note</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};