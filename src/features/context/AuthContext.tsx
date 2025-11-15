
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { id: string; name: string } | null;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  const login = async (credentials: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    setIsAuthenticated(true);
    setUser({ id: 'u1', name: 'User Name' }); 
  };

  const registerUser = async (data: any) => {
    console.log("Tentativa de registro:", data);
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.email === "erro@email.com") { 
                reject(new Error("E-mail já cadastrado."));
            } else {
                resolve({ 
                    token: "mock-token-123", 
                    userId: "u" + Math.random(), 
                    userName: data.fullName 
                });
            }
        }, 1500);
    });

    setIsAuthenticated(true);
    setUser({ id: "u" + Math.random(), name: data.fullName });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};