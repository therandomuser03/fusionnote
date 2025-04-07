
import { useAuth } from '@/context/AuthContext';
import { useNotes } from '@/context/NotesContext';
import { Button } from '@/components/ui/button';
import { PlusCircle, LogOut, FileText, Search, Info } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

type SidebarProps = {
  isOpen: boolean;
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { signOut, user } = useAuth();
  const { notes, createNote, setCurrentNote, currentNote } = useNotes();
  const [searchTerm, setSearchTerm] = useState('');

  const handleNewNote = () => {
    createNote('Untitled Note', '');
  };

  // Enhanced search that looks in both titles and content
  const filteredNotes = useMemo(() => {
    if (!searchTerm.trim()) return notes;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return notes.filter(note => 
      note.title.toLowerCase().includes(lowerSearchTerm) ||
      (note.content && note.content.toLowerCase().includes(lowerSearchTerm))
    );
  }, [notes, searchTerm]);

  // Get a plain text preview from HTML content
  const getContentPreview = (htmlContent: string, maxLength: number = 60): string => {
    if (!htmlContent) return '';
    
    // Create a temporary element to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    if (textContent.length <= maxLength) return textContent;
    return textContent.substring(0, maxLength).trim() + '...';
  };

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-0'} lg:w-64 h-full bg-sidebar border-r transition-all duration-300 overflow-hidden flex flex-col dark:bg-sidebar dark:border-sidebar-border`}>
      <div className="p-4 border-b flex flex-col gap-2 dark:border-sidebar-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-lg">My Notes</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleNewNote}>
                  <PlusCircle className="h-5 w-5 text-fusion-600 dark:text-fusion-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Create new note (Ctrl+N)</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-2 space-y-1">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-8">
              <div className="flex flex-col items-center justify-center space-y-2">
                <Info className="h-10 w-10 text-muted-foreground opacity-40" />
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? 'No notes found' : 'No notes yet. Create your first note!'}
                </p>
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSearchTerm('')}
                    className="mt-2"
                  >
                    Clear search
                  </Button>
                )}
              </div>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <button
                key={note.id}
                className={`w-full text-left p-2 rounded-md hover:bg-accent group flex flex-col gap-1 transition-colors ${
                  currentNote && note.id === currentNote.id ? 'bg-accent' : ''
                }`}
                onClick={() => setCurrentNote(note)}
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-fusion-400 group-hover:text-fusion-600 dark:text-fusion-500 dark:group-hover:text-fusion-400 flex-shrink-0" />
                  <div className="truncate font-medium">
                    {note.title || 'Untitled Note'}
                  </div>
                </div>
                
                {note.content && (
                  <p className="text-xs text-muted-foreground ml-6 line-clamp-2">
                    {getContentPreview(note.content)}
                  </p>
                )}
                
                <div className="flex items-center justify-between ml-6 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {new Date(note.updated_at).toLocaleDateString()}
                  </span>
                  
                  {/* Show if note matches search but title doesn't */}
                  {searchTerm && !note.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
                   note.content && note.content.toLowerCase().includes(searchTerm.toLowerCase()) && (
                    <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">
                      Content match
                    </Badge>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
      
      <div className="p-4 border-t dark:border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-fusion-400 flex items-center justify-center text-white">
              {user?.email?.substring(0, 1).toUpperCase() || 'U'}
            </div>
            <span className="ml-2 text-sm truncate max-w-[150px]">
              {user?.email}
            </span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={signOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Sign out</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </aside>
  );
};
