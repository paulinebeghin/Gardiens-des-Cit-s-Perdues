import { z } from "zod/v4";

const CategoryBookEnum = z.enum(["BOOK", "BOOK_GRAPH"]);

export const createBookSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire").max(100),
  subtitle: z.string().optional().nullable().default(""),
  
  // ICI : Retire le .min(1), sinon une chaîne vide est refusée
  titleCategory: z.string().optional().default(""), 
  
  grandFormat: z.string().optional().default(""),
  poche: z.string().optional().default(""),
  collector: z.string().optional().default(""),
  graph:z.string().optional().default(""),
  
  // ICI : Retire le .min(10), sinon Zod bloque si tu n'écris rien
  summary: z.string().optional().nullable().default(""),

  epubURL: z.string().optional().default(""),
  
  // ICI : Retire .url() ou assure-toi que l'input n'est pas vide
  img: z.string().optional().default(""),
  
  // ICI : Retire le .min(1)
  imgCategory: z.string().optional().default(""),
  
  category: CategoryBookEnum,
});

export const updateBookSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire").max(100).optional(),
  subtitle: z.string().optional().nullable(),
  titleCategory : z.string().min(1, "Le titre est obligatoire").optional(),
  
  grandFormat: z.string().optional(),
  poche: z.string().optional(),
  collector: z.string().optional(),
  graph:z.string().optional().default(""),

  summary: z.string().min(10, "Le résumé doit faire au moins 10 caractères").optional(),
  
  epubURL: z.string().optional(),
  img: z.string().url("L'URL de l'image n'est pas valide").optional(),
  imgCategory: z.string().min(1, "La catégorie d'image est requise").optional(),
  
  category: CategoryBookEnum.optional(),
});

export type CreateBookDto = z.infer<typeof createBookSchema>;
export type UpdateBookDto = z.infer<typeof updateBookSchema>;