import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<"loading" | "admin" | "denied">("loading");

  // Vérifie si l'utilisateur est connecté et s'il est admin en appelant l'API /api/user/me. Si l'utilisateur n'est pas connecté ou n'est pas admin, redirige vers la page d'authentification.
  useEffect(() => {
    fetch("http://localhost:3000/api/user/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Non authentifié");
        return res.json();
      })
      .then((user) => {
        setStatus(user.role === "ADMIN" ? "admin" : "denied");
      })
      .catch(() => setStatus("denied"));
  }, []);

  if (status === "loading") return <p className="text-center p-10">Chargement...</p>;
  if (status === "denied") return <Navigate to="/auth" replace />;

  return <>{children}</>;
};
