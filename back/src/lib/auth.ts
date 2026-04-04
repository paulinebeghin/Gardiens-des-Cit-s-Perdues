import { betterAuth } from "better-auth"; 
import { prismaAdapter } from "better-auth/adapters/prisma"; 
import db from "@/lib/db";

const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  account: {
    accountLinking: {
      enabled: true,
      // Optionnel : demande une vérification d'email avant de lier
      // trustedProviders: ["google", "github"] 
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  // CETTE FONCTION FORCE L'EMAIL SI GITHUB NE LE DONNE PAS
  mapUser: (user: { email: any; id: any; }) => ({
    ...user,
    email: user.email || `${user.id}@github.com`,
  }),
},
  },

  baseURL: "http://localhost:3000", 
  trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:5173"],
  advanced: {
    crossSubDomainCookies: {
      enabled: isProduction,
    },
    defaultCookieAttributes: {
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    },
  },
});
