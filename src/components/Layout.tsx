import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import AuthForm from './AuthForm';
import { ThemeToggle } from './ThemeToggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNotes } from '@/context/NotesContext';
import { toast } from 'sonner';
import { Badge } from './ui/badge';
import Dashboard from './Dashboard'; // Import your Dashboard component

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();
  const { createNote } = useNotes();
  // This state controls when to show the AuthForm
  const [showAuthForm, setShowAuthForm] = useState(false);

  // Keyboard shortcut for creating a new note
  useHotkeys('ctrl+n', (e) => {
    e.preventDefault();
    if (user) {
      createNote('Untitled Note', '');
      toast.success('New note created');
    }
  });

  // If not logged in, render the Dashboard component
  if (!user) {
    return (
      <Dashboard
        onAuthClick={() => setShowAuthForm(true)}
        showAuthForm={showAuthForm}
        onCloseAuthForm={() => setShowAuthForm(false)}
      />
    );
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
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="mr-2 lg:hidden"
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







// import React, { useState } from 'react';
// import { Sidebar } from './Sidebar';
// import { Menu } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/context/AuthContext';
// import AuthForm from './AuthForm';
// import { ThemeToggle } from './ThemeToggle';
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
// import { useHotkeys } from 'react-hotkeys-hook';
// import { useNotes } from '@/context/NotesContext';
// import { toast } from 'sonner';
// import { Badge } from './ui/badge';

// type LayoutProps = {
//   children: React.ReactNode;
// };

// export const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const { user } = useAuth();
//   const { createNote } = useNotes();

//   // Add keyboard shortcut for new note
//   useHotkeys('ctrl+n', (e) => {
//     e.preventDefault();
//     if (user) {
//       createNote('Untitled Note', '');
//       toast.success('New note created');
//     }
//   });

//   if (!user) {
//     return <AuthForm />;
//   }

//   return (
//     <div className="flex h-screen bg-background">
//       <Sidebar isOpen={sidebarOpen} />
      
//       <main className="flex-1 flex flex-col h-full overflow-hidden">
//         <header className="flex items-center justify-between px-4 py-2 bg-background border-b">
//           <div className="flex items-center">
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setSidebarOpen(!sidebarOpen)}
//                     className="mr-2 lg:hidden"
//                   >
//                     <Menu className="h-5 w-5" />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>{sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}</TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//             <h1 className="text-xl font-semibold text-fusion-700 dark:text-fusion-400">FusionNote</h1>
//             <Badge variant="outline" className="ml-3 bg-primary/10 text-xs">
//               <span className="flex items-center gap-1">
//                 <kbd className="px-1 text-[10px]">Ctrl+N</kbd>
//                 <span>New note</span>  
//               </span>
//             </Badge>
//           </div>
//           <ThemeToggle />
//         </header>
//         <div className="flex-1 overflow-auto p-4">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// };
