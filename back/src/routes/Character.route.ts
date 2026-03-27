import { authMiddleware } from "@/middlewares/auth.middleware";
import { adminMiddleware } from "@/middlewares/admin.middleware";
import express from "express";
import * as characterController from "@/controllers/character.controller";

const router: express.Router = express.Router();

router.get("/", characterController.getAll)
router.get("/:slug", characterController.getBySlug)
router.post("/", authMiddleware, adminMiddleware, characterController.create)
router.patch("/:slug", authMiddleware, adminMiddleware, characterController.update)
router.delete("/:slug", authMiddleware, adminMiddleware, characterController.remove)

export default router