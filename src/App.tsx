import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import { NotesProvider } from "./context/NotesContext";
import { ThemeProvider } from "./components/ThemeProvider"; 
import Dashboard from "./components/Dashboard";
import AuthForm from "./components/AuthForm";
import { Layout } from "./components/Layout";
import NoteEditor from "./components/NoteEditor";
import { useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  
  if (user === undefined) {
    // Auth is being determined, show loading or nothing
    return null;
  }
  
  if (!user) {
    // User is not authenticated
    return <Navigate to="/authform" replace />;
  }
  
  return <>{children}</>;
};

// Public route component that redirects if user is logged in
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  
  if (user === undefined) {
    // Auth is being determined, show loading or nothing
    return null;
  }
  
  return <>{children}</>;
};

// Route configuration
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><Dashboard /></PublicRoute>} />
      <Route path="/authform" element={<PublicRoute><AuthForm /></PublicRoute>} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Layout>
              <NoteEditor />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <ThemeProvider defaultTheme="system">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <NotesProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </NotesProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;