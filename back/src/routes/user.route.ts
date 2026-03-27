import { authMiddleware } from "@/middlewares/auth.middleware";
import express from "express";
import * as userController from "@/controllers/user.controller";

const router: express.Router = express.Router();

router.get("/me", authMiddleware, userController.getMe);

export default router;
