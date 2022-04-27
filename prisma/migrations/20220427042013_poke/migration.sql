-- CreateTable
CREATE TABLE "leaderboard" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL DEFAULT E'guess',
    "points" INTEGER NOT NULL DEFAULT 0,
    "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "leaderboard_pkey" PRIMARY KEY ("id")
);
