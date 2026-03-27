import { Request, Response, NextFunction } from "express"
import db from "@/lib/db"

// Middleware pour vérifier si l'utilisateur est admin
export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await db.user.findUnique({
            where: { id: req.userId! },
            select: { role: true }
        });

        if (!user || user.role !== "ADMIN") {
            res.status(403).json({ message: "Accès réservé aux administrateurs" });
            return;
        }

        next();
    } catch (error) {
        res.status(403).json({ message: "Accès réservé aux administrateurs" });
    }
};
