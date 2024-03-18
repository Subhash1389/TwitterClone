/*
  Warnings:

  - Added the required column `retweetcount` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "retweetcount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "retweetcount" INTEGER NOT NULL;
