-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "Nombre" VARCHAR(255) NOT NULL,
    "Edad" TEXT NOT NULL,
    "Departamento" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
