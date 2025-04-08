import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the User type
type User = {
  email: string;
  id: string;
  password: string; // Add password to store (in a real app, you'd never store plain passwords)
};

// Define the context type
type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
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
  const signIn = async (email: string, password: string) => {
    // Get all users from localStorage
    const allUsers = localStorage.getItem('fusionNote_all_users');
    let users: User[] = [];
    
    if (allUsers) {
      try {
        users = JSON.parse(allUsers);
        
        // Find user with matching email and password
        const foundUser = users.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          // Store user in state and localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('fusionNote_user', JSON.stringify(foundUser));
          }
          setUser(foundUser);
          return true;
        } else {
          console.error('Invalid email or password');
          return false;
        }
      } catch (error) {
        console.error('Failed to parse stored users:', error);
      }
    }
    
    // If no users or user not found/password doesn't match
    return false;
  };

  // Sign up function
  const signUp = async (email: string, password: string) => {
    // Get all users from localStorage
    const allUsers = localStorage.getItem('fusionNote_all_users');
    let users: User[] = [];
    
    if (allUsers) {
      try {
        users = JSON.parse(allUsers);
        
        // Check if email already exists
        if (users.some(u => u.email === email)) {
          console.error('Email already in use');
          return false;
        }
      } catch (error) {
        console.error('Failed to parse stored users:', error);
      }
    }
    
    // Create new user
    const newUser: User = { 
      email, 
      id: `user_${Date.now()}`,
      password
    };
    
    // Add to users list
    users.push(newUser);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('fusionNote_all_users', JSON.stringify(users));
      localStorage.setItem('fusionNote_user', JSON.stringify(newUser));
    }
    
    setUser(newUser);
    return true;
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