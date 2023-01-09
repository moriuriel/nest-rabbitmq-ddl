import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { QueueType } from '../config';

export class RabbitMQAdapter {
  static buildRabbitMQConnection(options: QueueType): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: options.queueName,
        noAck: false,
        queueOptions: options.queueOptions,
      },
    });
  }
}
