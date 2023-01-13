import { Module, Scope } from '@nestjs/common';
import { LoggerAdapter } from 'src/adapter/logger/Logger.adapter';
import { RabbitMQAdapter } from './RabbitMQAdapter';

@Module({
  providers: [
    {
      scope: Scope.REQUEST,
      provide: 'logger',
      useClass: LoggerAdapter,
    },
    RabbitMQAdapter,
  ],
})
export class QueueModule {}
