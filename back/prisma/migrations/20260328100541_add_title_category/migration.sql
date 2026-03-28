/*
  Warnings:

  - Added the required column `titleCategory` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "titleCategory" TEXT NOT NULL;
