import { Category } from "@prisma/client";
import { z } from "zod/v4";

export const createCharacterSchema = z.object({
    title : z.string().min(1, "Le titre est obligatoire").max(50, "Le titre doit faire moins de 51 caractères"),
    category : z.string().min(1, "La categories est obligatoire").max(50, "La categories doit faire moins de 51 caractères"),
    content : z.array(z.string()).min(1, "Le contenu est obligatoire"),
    abilities : z.array(z.string()).optional().default([]) ,
    family : z.array(z.string()).optional().default([]) ,
    imageCard : z.string().default(""),
    imageFull : z.string().default(""),
});
export const updateCharacterSchema = z.object({
    title : z.string().min(1, "Le titre est obligatoire").max(50, "Le titre doit faire moins de 51 caractères"),
    category : z.string().min(1, "La categories est obligatoire").max(50, "La categories doit faire moins de 51 caractères"),
    content : z.array(z.string()).min(1, "Le contenu est obligatoire"),
    abilities : z.array(z.string()).optional().default([]) ,
    family : z.array(z.string()).optional().default([]) ,
    imageCard : z.string().default(""),
    imageFull : z.string().default(""),
});

export type CreateCharacterDto = z.infer<typeof createCharacterSchema>
export type UpdateCharacterDto = z.infer<typeof updateCharacterSchema>