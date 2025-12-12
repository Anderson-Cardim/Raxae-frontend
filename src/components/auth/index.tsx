import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/context/AuthContext.tsx';

export const ProtectedRoute = () => {

  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};