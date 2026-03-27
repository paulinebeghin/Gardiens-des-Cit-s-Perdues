import db from "@/lib/db";

// Récupère les infos de l'utilisateur connecté (id, name, email, role).
export const getUserById = async (userId: string) => {
    return db.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, role: true }
    });
};
