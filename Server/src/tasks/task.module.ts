import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TaskControllers } from "./task.controller";
import { TaskService } from "./task.service";
import { PrismaModules } from "../prisma/prisma.module"
import { MulterMiddleware } from "./middlewares/multer.middleware";

@Module({
    imports: [PrismaModules],
    providers: [TaskService],
    controllers: [TaskControllers],
    exports: [TaskService]
})
export class taskModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(MulterMiddleware).forRoutes("tasks")
    }
 }