import express, { Request, Response, Router } from "express";
import db from "../lib/db.js"; 

const router: Router = express.Router();

// --- 1. GET ALL (La liste pour tes cartes) ---
router.get('/', async (req: Request, res: Response) => {
  try {
    const pages = await db.page.findMany({
      orderBy: {
        title: 'asc' // 'asc' = ascendant (A-Z), 'desc' = descendant (Z-A)
      },
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

router.get('/category/:catName', async (req, res) => {
  const { catName } = req.params;
  try {
    const pages = await db.page.findMany({
      where: { 
        category: catName.toUpperCase() as any // On force en majuscules pour l'Enum
      },
      orderBy: {
        title: 'asc' // 'asc' = ascendant (A-Z), 'desc' = descendant (Z-A)
      },
      select: {
        id: true,
        title: true,
        slug: true,
        imageCard: true,
        category: true
      }
    });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors du filtrage" });
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
    console.error("DEBUG PRISMA ERROR:", error); // Ajoute cette ligne !
    if (error.code === 'P2002') {
      return res.status(400).json({ error: "Ce slug est déjà utilisé." });
    }
    return res.status(500).json({ error: "Erreur lors de la création.", message: error.message });
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

router.delete("/:slug", async (req : Request, res : Response) => {
    try{
        const slug = req.params.slug as string;

        const existing = await db.page.findUnique({
            where: { slug: slug },
        });
        if(!existing){

            return res.status(404).json({message : "Tarif not found"})
        }

        await db.page.delete({
            where: { slug: slug },
        })
        res.status(204).json("Le personnage est supprimée avec succès");
    } catch(error){
        res.status(500).json({message : "Error server", error});
    }
})

export default router;