// import express, { Request, Response, Router } from "express";
// import db from "../lib/db.js"; 

// const router: Router = express.Router();

// // La liste pour les cartes
// router.get('/', async (req: Request, res: Response) => {
//   try {
//     const pages = await db.page.findMany({
//       orderBy: {
//         title: 'asc' 
//       },
//       select: {
//         id: true,
//         title: true,
//         slug: true,
//         category: true,
//         imageCard: true,
//         abilities: true
//       }
//     });
//     return res.json(pages);
//   } catch (error) {
//     console.error("Erreur GET ALL:", error);
//     return res.status(500).json({ error: "Erreur lors de la récupération" });
//   }
// });

// router.get('/category/:catName', async (req, res) => {
//   const { catName } = req.params;
//   try {
//     const pages = await db.page.findMany({
//       where: { 
//         category: catName.toUpperCase() as any 
//       },
//       orderBy: {
//         title: 'asc'
//       },
//       select: {
//         id: true,
//         title: true,
//         slug: true,
//         imageCard: true,
//         category: true
//       }
//     });
//     res.json(pages);
//   } catch (error) {
//     res.status(500).json({ error: "Erreur lors du filtrage" });
//   }
// });

// // Le détail d'un personnage
// router.get('/:slug', async (req: Request, res: Response) => {
//   const slug = req.params.slug as string;
//   try {
//     const page = await db.page.findUnique({
//       where: { slug: slug }
//     });
    
//     if (!page) {
//       return res.status(404).json({ error: "Personnage non trouvé" });
//     }
    
//     return res.json(page);
//   } catch (error) {
//     return res.status(500).json({ error: "Erreur serveur" });
//   }
// });

// // POST 
// router.post('/', async (req: Request, res: Response) => {
//   const { title, slug, category, imageCard, imageFull, abilities, family, content } = req.body;

//   if (!title || !slug || !category) {
//     return res.status(400).json({ error: "Champs obligatoires manquants." });
//   }

//   try {
//     const newPage = await db.page.create({
//       data: { title, slug, category, imageCard, imageFull, abilities, family, content },
//     });
//     return res.status(201).json(newPage);
//   } catch (error: any) {
//     console.error("DEBUG PRISMA ERROR:", error); // Ajoute cette ligne !
//     if (error.code === 'P2002') {
//       return res.status(400).json({ error: "Ce slug est déjà utilisé." });
//     }
//     return res.status(500).json({ error: "Erreur lors de la création.", message: error.message });
//   }
// });

// // PATCH 
// router.patch('/:slug', async (req: Request, res: Response) => {
//   const slug = req.params.slug as string;
//   const updates = req.body;

//   try {
//     const updatedPage = await db.page.update({
//       where: { slug: slug },
//       data: updates,
//     });
//     return res.json(updatedPage);
//   } catch (error) {
//     return res.status(500).json({ error: "Erreur lors de la modification" });
//   }
// });

// // DELETE (d'un personnage)
// router.delete("/:slug", async (req : Request, res : Response) => {
//     try{
//         const slug = req.params.slug as string;

//         const existing = await db.page.findUnique({
//             where: { slug: slug },
//         });
//         if(!existing){

//             return res.status(404).json({message : "Tarif not found"})
//         }

//         await db.page.delete({
//             where: { slug: slug },
//         })
//         res.status(204).json("Le personnage est supprimée avec succès");
//     } catch(error){
//         res.status(500).json({message : "Error server", error});
//     }
// })

// export default router;

import { authMiddleware } from "@/middlewares/auth.middleware";
import express from "express";
import * as characterController from "@/controllers/character.controller";

const router: express.Router = express.Router();

router.get("/", characterController.getAll)
router.get("/:slug", characterController.getBySlug)
router.patch("/:slug", authMiddleware, characterController.update)
router.post("/",  characterController.create)
router.delete("/:id", authMiddleware,  characterController.create)

export default router