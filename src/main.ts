import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { BurgerQueue } from './infrastructure/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const consumer = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: BurgerQueue.queueName,
        noAck: false,
        queueOptions: BurgerQueue.queueOptions,
      },
    },
  );

  await consumer.listen().then(() => {
    Logger.log('[Burger] Worker running');
  });

  await app.listen(3000);
}
bootstrap();
