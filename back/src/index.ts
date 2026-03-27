import "dotenv/config"; // Charge le .env immédiatement
import express, { Request, Response } from 'express';
import cors from "cors";
import { toNodeHandler } from 'better-auth/node';

import db from '@/lib/db';
import { auth } from "./lib/auth";
import contactRouter from "@/routes/contact.route";
import bookRouter from "@/routes/book.route";
import characterRouter from "@/routes/character.route";
import userRouter from "@/routes/user.route";

const app = express();
const port = 3000;

// 1. CORS en premier
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// 2. Route Auth (AVANT express.json pour éviter les conflits de lecture de flux)
app.all("/api/auth/{*splat}", toNodeHandler(auth))

// 3. Middlewares globaux pour le reste des routes
app.use(express.json());

// 4. Routes
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Bienvenue sur l'API de Docknotes" });
});

app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.use("/contact", contactRouter);
app.use("/characters", characterRouter);

// 5. Démarrage
app.listen(port, async () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
    try {
        await db.$connect();
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1); // Arrête le serveur si la DB est indispensable
    }
});
