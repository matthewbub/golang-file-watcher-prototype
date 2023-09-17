-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "task" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "datecreated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);
