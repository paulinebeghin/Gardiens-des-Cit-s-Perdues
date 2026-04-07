import { betterAuth } from "better-auth"; 
import { prismaAdapter } from "better-auth/adapters/prisma"; 
import db from "@/lib/db";

const isProduction = process.env.NODE_ENV === "production";
const baseURL = process.env.BETTER_AUTH_URL || (isProduction ? "https://gardiens-des-cit-s-perdues-production.up.railway.app" : "http://localhost:8000");

export const auth = betterAuth({
  baseURL,
  basePath: "/api/auth",

  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectURI: `${baseURL}/api/auth/callback/google`,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      redirectURI: `${baseURL}/api/auth/callback/github`,
    },
  },
  trustedOrigins: [
  "http://localhost:5173",
  "http://localhost:8000",
  "https://gardiens-des-cit-s-perdues.vercel.app",
  "https://gardiens-des-cit-s-perdues-production.up.railway.app"
],
  advanced: {
    crossSubDomainCookies: {
      enabled: isProduction,
    },
    useSecureCookies: isProduction,
    defaultCookieAttributes: {
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    },
    redirectTo: isProduction 
        ? "https://gardiens-des-cit-s-perdues.vercel.app/dashboard" 
        : "http://localhost:5173/dashboard",
  },
});