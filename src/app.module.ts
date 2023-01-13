import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controllers.module';
import { QueueModule } from './infrastructure/queue/queue.module';
@Module({
  imports: [QueueModule, ControllersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
