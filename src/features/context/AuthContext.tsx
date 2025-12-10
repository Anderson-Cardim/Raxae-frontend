import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../../services/authService';
import type { LoginRequest, CadastroRequest } from '../../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { id: string; name: string } | null;
  login: (credentials: LoginRequest) => Promise<void>;
  registerUser: (data: CadastroRequest) => Promise<void>;
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioId = localStorage.getItem('usuarioId');
    if (token && usuarioId) {
      setIsAuthenticated(true);
      setUser({ id: usuarioId, name: 'Usuário' });
    }
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await authService.login(credentials);
      setIsAuthenticated(true);
      setUser({ id: response.usuarioId, name: 'Usuário' });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const registerUser = async (data: CadastroRequest) => {
    try {
      await authService.cadastrar(data);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};