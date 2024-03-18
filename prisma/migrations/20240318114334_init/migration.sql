/*
  Warnings:

  - You are about to drop the column `commentid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `likeid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `retweetcount` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_commentid_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_likeid_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "commentid",
DROP COLUMN "likeid",
DROP COLUMN "retweetcount";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
