/*
  Warnings:

  - Added the required column `commentid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "commentid" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "tweetid" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_commentid_fkey" FOREIGN KEY ("commentid") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_tweetid_fkey" FOREIGN KEY ("tweetid") REFERENCES "Tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
