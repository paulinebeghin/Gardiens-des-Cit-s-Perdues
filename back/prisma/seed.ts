import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const db = new PrismaClient({ adapter });

// Ce script est à lancer une seule fois pour créer un compte admin. Il utilise l'API d'inscription de Better Auth pour que le mot de passe soit hashé correctement, puis met à jour le rôle et la vérification de l'email directement dans la DB.
async function main() {
    const email = "admin@admin.fr";
    const password = "admin123";

    // Vérifie si l'admin existe déjà
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
        console.log("✅ Le compte admin existe déjà.");
        return;
    }

    // Crée l'admin via l'API Better Auth signup pour hasher le mot de passe correctement
    const response = await fetch("http://localhost:8000/api/auth/sign-up/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Origin": "http://localhost:5173",
        },
        body: JSON.stringify({ name: "Admin", email, password }),
    });

    if (!response.ok) {
        const error = await response.text();
        console.error("❌ Erreur lors de la création du compte:", error);
        return;
    }

    // Passe le rôle en ADMIN et marque l'email comme vérifié
    await db.user.update({
        where: { email },
        data: { role: "ADMIN", emailVerified: true },
    });

    console.log("✅ Compte admin créé : admin@admin.fr / admin123");
    console.log("⚠️  Change le mot de passe en production !");
}

main()
    .catch(console.error)
    .finally(async () => {
        await db.$disconnect();
        await pool.end();
    });
