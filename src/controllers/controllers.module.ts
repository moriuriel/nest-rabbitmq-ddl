import { Module } from '@nestjs/common';
import { BurgerQueue, BurgerQueueDelay } from 'src/infrastructure/config';
import { RabbitMQAdapter } from 'src/infrastructure/queue/RabbitMQAdapter';
import { BurgerController } from './http';
import { BurgerController as MessagingBurgerController } from './messaging';
@Module({
  controllers: [BurgerController, MessagingBurgerController],
  providers: [
    {
      provide: 'messaging-client',
      useFactory: () => {
        return RabbitMQAdapter.buildRabbitMQConnection(BurgerQueue);
      },
    },
    {
      provide: 'messaging-client-delay',
      useFactory: () => {
        return RabbitMQAdapter.buildRabbitMQConnection(BurgerQueueDelay);
      },
    },
  ],
})
export class ControllersModule {}
