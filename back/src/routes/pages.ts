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
