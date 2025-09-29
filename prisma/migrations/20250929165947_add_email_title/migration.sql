/*
  Warnings:

  - Added the required column `title` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Email" ADD COLUMN     "title" TEXT NOT NULL;
