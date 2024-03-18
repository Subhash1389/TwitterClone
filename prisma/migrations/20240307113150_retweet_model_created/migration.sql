-- CreateTable
CREATE TABLE "Retweet" (
    "id" SERIAL NOT NULL,
    "tweetid" INTEGER NOT NULL,
    "retweetby" INTEGER NOT NULL,

    CONSTRAINT "Retweet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Retweet" ADD CONSTRAINT "Retweet_retweetby_fkey" FOREIGN KEY ("retweetby") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retweet" ADD CONSTRAINT "Retweet_tweetid_fkey" FOREIGN KEY ("tweetid") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
