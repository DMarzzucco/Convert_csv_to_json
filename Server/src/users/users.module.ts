import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModules } from 'src/prisma/prisma.module';
import { usersValidator } from './validator/users.validator';
import { CSVParserService } from './service/csv-parser.service';
import { MulterMiddleware } from './middleware/multer.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService, usersValidator, CSVParserService],
  imports: [PrismaModules],
  exports: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(MulterMiddleware).forRoutes("task")
    consumer.apply(MulterMiddleware).forRoutes({ path: "task", method: RequestMethod.POST })
  }
}
