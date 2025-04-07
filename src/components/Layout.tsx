import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNotes } from '@/context/NotesContext';
import { toast } from 'sonner';
import { Badge } from './ui/badge';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();
  const { createNote } = useNotes();
  const navigate = useNavigate();

  // Keyboard shortcut for creating a new note
  useHotkeys('ctrl+n', (e) => {
    e.preventDefault();
    if (user) {
      createNote('Untitled Note', '');
      toast.success('New note created');
    }
  });

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // If not logged in, redirect to auth form
  if (!user) {
    return <Navigate to="/authform" />;
  }

  // When the user is logged in, render the full layout
  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} />
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="flex items-center justify-between px-4 py-2 bg-background border-b">
          <div className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="mr-2"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <h1 className="text-xl font-semibold text-fusion-700 dark:text-fusion-400">FusionNote</h1>
            <Badge variant="outline" className="ml-3 bg-primary/10 text-xs">
              <span className="flex items-center gap-1">
                <kbd className="px-1 text-[10px]">Ctrl+N</kbd>
                <span>New note</span>
              </span>
            </Badge>
          </div>
          <ThemeToggle />
        </header>
        <div className="flex-1 overflow-auto p-4">
          {children}
        </div>
      </main>
    </div>
  );
};