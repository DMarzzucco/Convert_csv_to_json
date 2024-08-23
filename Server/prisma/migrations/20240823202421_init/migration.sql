-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "Nombre" VARCHAR(255) NOT NULL,
    "Edad" INTEGER NOT NULL,
    "Departamento" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "create_time" DATE NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
