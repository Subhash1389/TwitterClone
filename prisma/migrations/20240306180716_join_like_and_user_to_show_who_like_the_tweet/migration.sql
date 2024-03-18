/*
  Warnings:

  - Added the required column `likeid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "likeid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_likeid_fkey" FOREIGN KEY ("likeid") REFERENCES "Like"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
