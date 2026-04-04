CREATE TYPE "Category" AS ENUM (
    'CYGNE_NOIR',
    'ANTAGONISTES',
    'CONSEILS',
    'PROTAGONISTES',
    'ENTOURAGE_MAJEUR',
    'FIGURANTS_ACTIFS'
);

CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "imageCard" TEXT NOT NULL,
    "imageFull" TEXT,
    "abilities" TEXT[],
    "family" TEXT[],
    "content" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "fk_user" 
    FOREIGN KEY ("userId") 
    REFERENCES "User"("id")
);





















CREATE TABLE "user" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "Page" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "category" "Category" NOT NULL,
    "imageCard" TEXT NOT NULL,
    "imageFull" TEXT,
    "abilities" TEXT[], 
    "family" TEXT[],
    "content" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Page_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Book" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "titleCategory" TEXT NOT NULL,
    "grandFormat" TEXT,
    "poche" TEXT,
    "collector" TEXT,
    "graph" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "epubURL" TEXT,
    "summary" TEXT,
    "imgCategory" TEXT,
    "img" TEXT,
    "category" "CategoryBook" NOT NULL
);


CREATE TABLE "session" (
    "id" TEXT PRIMARY KEY,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT UNIQUE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "account" (
    "id" TEXT PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "verification" (
    "id" TEXT PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

CREATE TYPE "Category" AS ENUM (
  'CYGNE_NOIR', 
  'ANTAGONISTES', 
  'CONSEILS', 
  'PROTAGONISTES', 
  'ENTOURAGE_MAJEUR', 
  'FIGURANTS_ACTIFS'
);

CREATE TYPE "CategoryBook" AS ENUM ('BOOK', 'BOOK_GRAPH');