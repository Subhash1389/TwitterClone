/*
  Warnings:

  - Added the required column `likecount` to the `Tweet` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tweet_userid_key";

-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "likecount" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "tweetid" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_tweetid_fkey" FOREIGN KEY ("tweetid") REFERENCES "Tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
