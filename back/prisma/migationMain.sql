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

);