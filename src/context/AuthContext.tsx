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
  // Start with an undefined user so we know whether we've hydrated yet.
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('fusionNote_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('fusionNote_user');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }
  }, []);

  // Sign in function
  const signIn = async (email: string, _password: string) => {
    const mockUser = { email, id: `user_${Date.now()}` };

    if (typeof window !== 'undefined') {
      localStorage.setItem('fusionNote_user', JSON.stringify(mockUser));
    }
    setUser(mockUser);
  };

  // Sign up function
  const signUp = async (email: string, _password: string) => {
    const mockUser = { email, id: `user_${Date.now()}` };

    if (typeof window !== 'undefined') {
      localStorage.setItem('fusionNote_user', JSON.stringify(mockUser));
    }
    setUser(mockUser);
  };

  // Sign out function
  const signOut = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fusionNote_user');
    }
    setUser(null);
  };

  // Until we've determined the auth state, render nothing (or a loading indicator)
  if (user === undefined) {
    return null;
  }

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
