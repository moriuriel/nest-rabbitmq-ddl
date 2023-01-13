import { Module, Scope } from '@nestjs/common';
import { LoggerAdapter } from 'src/adapter/logger/Logger.adapter';
import { RabbitMQAdapter } from 'src/infrastructure/queue/RabbitMQAdapter';
import { BurgerController } from './http';
import { BurgerController as MessagingBurgerController } from './messaging';
@Module({
  controllers: [BurgerController, MessagingBurgerController],
  providers: [
    {
      provide: 'messaging-client',
      useClass: RabbitMQAdapter,
    },
    {
      provide: 'messaging-client-delay',
      useClass: RabbitMQAdapter,
    },
    {
      scope: Scope.TRANSIENT,
      provide: 'logger',
      useClass: LoggerAdapter,
    },
  ],
})
export class ControllersModule {}
