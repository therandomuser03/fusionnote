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

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="system">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <NotesProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/authform" element={<AuthForm />} />
                <Route path="/dashboard" element={
                  <Layout>
                    <NoteEditor />
                  </Layout>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </NotesProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;