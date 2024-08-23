import { Module } from "@nestjs/common";
import { TaskControllers } from "./task.controller";
import { TaskService } from "./task.service";
import { PrismaModules } from "../prisma/prisma.module"

@Module({
    imports: [PrismaModules],
    providers: [TaskService],
    controllers: [TaskControllers],
    exports: [TaskService]
})
export class taskModule { }