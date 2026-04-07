import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
    fetchOptions: {
        credentials: "include", // <--- INDISPENSABLE pour envoyer les cookies au serveur
    },
});