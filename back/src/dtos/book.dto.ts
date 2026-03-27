import { z } from "zod/v4";

const CategoryBookEnum = z.enum(["BOOK", "BOOK_GRAPH"]);

export const createBookSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire").max(100),
  subtitle: z.string().optional(),
  
  grandFormat: z.string().optional(),
  poche: z.string().optional(),
  collector: z.string().optional(),
  
  summary: z.string().min(10, "Le résumé doit faire au moins 10 caractères").optional(),

  epubURL: z.string().url("L'URL de l'ePub n'est pas valide").optional(),
  img: z.string().url("L'URL de l'image n'est pas valide").optional(),
  imgCategory: z.string().min(1, "La catégorie d'image est requise").optional(),
  
  category: CategoryBookEnum,
});

export const updateBookSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire").max(100),
  subtitle: z.string().optional(),
  
  grandFormat: z.string().optional(),
  poche: z.string().optional(),
  collector: z.string().optional(),

  summary: z.string().min(10, "Le résumé doit faire au moins 10 caractères"),
  
  epubURL: z.string().url("L'URL de l'ePub n'est pas valide"),
  img: z.string().url("L'URL de l'image n'est pas valide"),
  imgCategory: z.string().min(1, "La catégorie d'image est requise"),
  
  category: CategoryBookEnum,
});


export type CreateBookDto = z.infer<typeof createBookSchema>;
export type UptadeBookDto = z.infer<typeof updateBookSchema>;