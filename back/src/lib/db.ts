import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg"; // Indispensable pour créer la connexion

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL n'est pas défini !");
  }

  // 1. On crée d'abord un pool de connexions PostgreSQL
  const pool = new pg.Pool({ connectionString });
  
  // 2. On passe ce pool à l'adaptateur PrismaPg
  const adapter = new PrismaPg(pool);

  // 3. On retourne l'instance avec l'adaptateur configuré
  return new PrismaClient({ adapter });
}

const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export default db;