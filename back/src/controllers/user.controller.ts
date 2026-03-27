import { Request, Response } from "express";
import * as userService from "@/services/user.service";

// Récupère les informations de l'utilisateur connecté
export const getMe = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(req.userId!);

        if (!user) {
            res.status(404).json({ message: "Utilisateur introuvable" });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};
