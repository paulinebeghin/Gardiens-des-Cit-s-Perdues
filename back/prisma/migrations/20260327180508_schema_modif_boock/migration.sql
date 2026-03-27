/*
  Warnings:

  - Added the required column `category` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryBook" AS ENUM ('BOOK', 'BOOK_GRAPH');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "category" "CategoryBook" NOT NULL;
