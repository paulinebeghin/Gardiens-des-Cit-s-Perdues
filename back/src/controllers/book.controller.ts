import { Request, Response } from "express";
import { createBookSchema, updateBookSchema } from "@/dtos/book.dto";
import * as bookService from "../services/book.service"

export const getAll = async (_req: Request, res: Response) => {
    try {
        const notes = await bookService.getAllBooks();
        res.json(notes);
    } catch (error) {
        res.status(500).json({message : "Erreur server", error});
    };
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Récupération propre

    if (!id) {
      return res.status(400).json({ message: "ID manquant dans les paramètres" });
    }

    // Appel au service
    const note = await bookService.getBookById(id as string);

    if (!note) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }

    return res.json(note);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};

export const create = async (req : Request, res : Response) => {
    try {
        const parsed = createBookSchema.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({message : "Données invalides", errors : parsed.error.issues});
        }
        const note = await bookService.createBook( parsed.data);
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({message : "Erreur server", error});    
    };
};

export const update = async (req : Request, res : Response) => {
    try {
        const parsed = updateBookSchema.safeParse(req.body);
        const { id } = req.params;
        if(!parsed.success){
            return res.status(400).json({message : "Données invalides", errors : parsed.error.issues});
        }
        const note = await bookService.updateBook(id as string, parsed.data);
        if(!note){
            return res.status(404).json({message : "Note not found"});
        }  
        res.json(note)   
    } catch (error) {
       res.status(500).json({message : "Erreur server", error}); 
    };
};

export const remove = async (req : Request, res : Response) => {
    try {
        const { id } = req.params;
        const result = await bookService.deleteNote(id as string,)
        if(!result){
           return res.status(404).json({message : "Note not found"}); 
        }
        res.status(204).send()
    } catch (error) {
        res.status(500).json({message : "Erreur server", error});
    }
}