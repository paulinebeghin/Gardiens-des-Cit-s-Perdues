import db from "@/lib/db";

export const getUserById = async (userId: string) => {
    return db.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, role: true }
    });
};
