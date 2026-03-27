import { createCharacterSchema, updateCharacterSchema } from "../dtos/Character.dto";
import * as characterService from "@/services/character.service";
import { Request, Response } from "express";

export const getAll = async (req: Request, res: Response) => {
    try {
        const search = typeof req.query.title === "string" ? req.query.title : undefined;
        const notes = await characterService.getAllCharacter(req.userId!);
        res.json(notes);
    } catch (error) {
        res.status(500).json({message : "Erreur server", error});
    };
};

export const getBySlug = async (
  req: Request<{ slug: string }>, res: Response) => {
    try {
        const { slug } = req.params;

        if (!slug) {
            return res.status(400).json({ message: "Slug manquant" });
        }

        const character = await characterService.getCharacterBySlug(slug);

        if (!character) {
            return res.status(404).json({ message: "Personnage introuvable" });
        }

        return res.json(character);
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

export const create = async (req : Request, res : Response) => {
    try {
        const parsed = createCharacterSchema.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({message : "Données invalides", errors : parsed.error.issues});
        }
        const note = await characterService.createCharacter(req.userId! , parsed.data);
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({message : "Erreur server", error});    
    };
};

export const update = async (req : Request, res : Response) => {
    try {
        const parsed = updateCharacterSchema.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({message : "Données invalides", errors : parsed.error.issues});
        }
        const slug = req.params.slug as string;
        const userId = (req as any).userId || (req as any).user?.id;
        const character = await characterService.updateNote(slug, userId, parsed.data);
        if(!character){
            return res.status(404).json({message : "Note not found"});
        }  
        res.json(character)   
    } catch (error) {
       res.status(500).json({message : "Erreur server", error}); 
    };
};

export const remove = async (req : Request, res : Response) => {
    try {
         const slug = req.params.slug as string;
        const userId = (req as any).userId || (req as any).user?.id;
        const result = await characterService.deleteCharacter(slug, userId)
        if(!result){
           return res.status(404).json({message : "Note not found"}); 
        }
        res.status(204).send()
    } catch (error) {
        res.status(500).json({message : "Erreur server", error});
    }
}