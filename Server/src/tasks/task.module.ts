import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TaskControllers } from "./task.controller";
import { TaskService } from "./task.service";
import { PrismaModules } from "../prisma/prisma.module"
import { MulterMiddleware } from "./middlewares/multer.middleware";
import { TaskValidator } from "./validator/task.validator";
import { CSVParserService } from "./service/csv-parser.service";

@Module({
    imports: [PrismaModules],
    providers: [TaskService, TaskValidator, CSVParserService],
    controllers: [TaskControllers],
    exports: [TaskService]
})
export class taskModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(MulterMiddleware).forRoutes("tasks")
    }
 }