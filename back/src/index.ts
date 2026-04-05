import "dotenv/config"; // Charge le .env immédiatement
import express, { Request, Response } from 'express';
import cors from "cors";
import { toNodeHandler } from 'better-auth/node';

import db from '@/lib/db';
import { auth } from "./lib/auth";
import contactRouter from "@/routes/contact.route";
import bookRouter from "@/routes/book.route";
import characterRouter from "@/routes/Character.route";
import userRouter from "@/routes/user.route";

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 8000;

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.all("/api/auth/{*splat}", toNodeHandler(auth))

app.use(express.json());


app.get("/", (_req: Request, res: Response) => {
    res.json({ message: "Bienvenue sur l'API de Docknotes" });
});

app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.use("/contact", contactRouter);
app.use("/characters", characterRouter);


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
