import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config"
import { taskModule } from './tasks/task.module';

@Module({
  imports: [taskModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule { }
