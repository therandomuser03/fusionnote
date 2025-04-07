import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the User type
type User = {
  email: string;
  id: string;
};

// Define the context type
type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('fusionNote_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('fusionNote_user');
      }
    }
  }, []);

  // Sign in function
  const signIn = async (email: string, _password: string) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll just create a mock user
    const mockUser = { email, id: `user_${Date.now()}` };
    
    // Save user to localStorage for persistence
    localStorage.setItem('fusionNote_user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  // Sign up function
  const signUp = async (email: string, _password: string) => {
    // Similar to signIn for this demo
    const mockUser = { email, id: `user_${Date.now()}` };
    
    localStorage.setItem('fusionNote_user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  // Sign out function
  const signOut = async () => {
    localStorage.removeItem('fusionNote_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};