import pagesRouter from "@/routes/pages";
import express, {Request, Response} from 'express';
import cors from "cors";
import db from '@/lib/db';
import contactRouter from "@/routes/contact.route";
import dotenv from 'dotenv';
// On charge les variables d'environnement AVANT tout le reste
dotenv.config();
const app = express();
const port = 3000;

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}));


app.use(express.json());

app.get("/", (req : Request, res : Response) => {
    res.json({
        message : "Bienvenue sur l'API de Docknotes"
    });
});

app.use("/api/pages", pagesRouter);
app.use("/contact", contactRouter);


app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    try{
        await db.$connect();
        console.log("Databe connected successfull")
    } catch(error){
        console.log("Database connection failed:", error)
    }
});