import { Module } from '@nestjs/common';
import { RabbitMQAdapter } from 'src/infrastructure/queue/RabbitMQAdapter';
import { BurgerController } from './http';
import { BurgerController as MessagingBurgerController } from './messaging';
@Module({
  controllers: [BurgerController, MessagingBurgerController],
  providers: [
    {
      provide: 'messaging-client',
      useFactory: () => {
        return RabbitMQAdapter.buildRabbitMQConnection();
      },
    },
    {
      provide: 'messaging-client-delay',
      useFactory: () => {
        return RabbitMQAdapter.buildRabbitMQConnectionDelay();
      },
    },
  ],
})
export class ControllersModule {}
