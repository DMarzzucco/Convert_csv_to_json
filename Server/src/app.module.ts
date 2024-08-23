import { Module } from '@nestjs/common';
import { taskModule } from './tasks/task.module';

@Module({
  imports: [taskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
