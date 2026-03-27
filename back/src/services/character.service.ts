import type { CreateCharacterDto, UpdateCharacterDto  } from "@/dtos/Character.dto";
import { Category } from "@prisma/client";
import db from "@/lib/db";
import { title } from "process";

export const getAllCategorie = async (userId: string, search?: string) => {
    return db.page.findMany({
        where: {
            
            userId: userId, 
            
            title: search ? {
                contains: search,
                mode: 'insensitive', // Optionnel : trouve "Sophie" même si on tape "sophie"
            } : undefined,
        },
        orderBy: { title: "asc" }, // "asc" est souvent mieux pour une liste alphabétique
    });
};

export const getAllCharacter = async (userId: string, search?: string) => {
    return db.page.findMany({
        where: {
            userId: userId,
            title: search ? {
                contains: search,
                mode: 'insensitive',
            } : undefined,
        },
        orderBy: { title: "asc" }, 
    });
};

export const getCharacterBySlug = async (slug: string) => {
    return await db.page.findFirst({
        where: {
            slug: slug,
        },
    });
};

export const createCharacter = async (userId: string, data: CreateCharacterDto) => {
    return db.page.create({
        data: {
            title: data.title,
           
            slug: data.title.toLowerCase().replace(/ /g, "-"),
            
            category: data.category as Category,
            
            
            abilities: data.abilities || [],
            family: data.family || [],
            content: data.content || [],

            imageCard: data.imageCard,
            imageFull: data.imageFull, 
            userId: userId 
        }
    });
};

export const updateNote = async (slug: string, userId : string, data : UpdateCharacterDto) => {
    const existing = await db.page.findUnique({where : {slug}});
    if(!existing || existing.userId !== userId) return null;

    return db.page.update({
        where : {slug : slug},
        data : {
            title: data.title,
           
            slug: data.title.toLowerCase().replace(/ /g, "-"),
            
            category: data.category as Category,
            
            
            abilities: data.abilities || [],
            family: data.family || [],
            content: data.content || [],

            imageCard: data.imageCard,
            imageFull: data.imageFull, 
            userId: userId 
        }
    });
};

export const deleteCharacter = async (slug: string, userId : string) => {
    const existing = await db.page.findUnique({where : {slug}});
    if(!existing || existing.userId !== userId) return null;
    
    await db.page.delete({where : {slug}});
    return true;
};