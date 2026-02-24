import express, { Request, Response, Router } from "express";
import db from "../lib/db.js"; 

const router: Router = express.Router();

// --- 1. GET ALL (La liste pour tes cartes) ---
router.get('/', async (req: Request, res: Response) => {
  try {
    const pages = await db.page.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        imageCard: true,
        abilities: true
      }
    });
    return res.json(pages);
  } catch (error) {
    console.error("Erreur GET ALL:", error);
    return res.status(500).json({ error: "Erreur lors de la récupération" });
  }
});

// --- 2. GET UNIQUE (Le détail d'un personnage) ---
router.get('/:slug', async (req: Request, res: Response) => {
  const slug = req.params.slug as string;
  try {
    const page = await db.page.findUnique({
      where: { slug: slug }
    });
    
    if (!page) {
      return res.status(404).json({ error: "Personnage non trouvé" });
    }
    
    return res.json(page);
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

// --- 3. POST (Création) ---
router.post('/', async (req: Request, res: Response) => {
  const { title, slug, category, imageCard, imageFull, abilities, family, content } = req.body;

  if (!title || !slug || !category) {
    return res.status(400).json({ error: "Champs obligatoires manquants." });
  }

  try {
    const newPage = await db.page.create({
      data: { title, slug, category, imageCard, imageFull, abilities, family, content },
    });
    return res.status(201).json(newPage);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: "Ce slug est déjà utilisé." });
    }
    return res.status(500).json({ error: "Erreur lors de la création." });
  }
});

// --- 4. PATCH (Modification) ---
router.patch('/:slug', async (req: Request, res: Response) => {
  const slug = req.params.slug as string;
  const updates = req.body;

  try {
    const updatedPage = await db.page.update({
      where: { slug: slug },
      data: updates,
    });
    return res.json(updatedPage);
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la modification" });
  }
});

export default router;