import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  // On vérifie si le token existe
  const isAuthenticated = localStorage.getItem('userToken') === 'active';

  if (!isAuthenticated) {
    // REDIRIGE VERS TA PAGE D'AUTH (ex: /auth ou /login)
    // Surtout pas vers /dashboard !
    return <Navigate to="/auth" replace />; 
  }

  return <>{children}</>;
};