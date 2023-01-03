import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

export class RabbitMQAdapter {
  static buildRabbitMQConnection(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'burguer',
        noAck: false,
        queueOptions: {
          deadLetterExchange: '',
          deadLetterRoutingKey: `burguer.failed`,
        },
      },
    });
  }

  static buildRabbitMQConnectionDelay(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'burguer.delay',
        noAck: false,
        queueOptions: {
          deadLetterExchange: '',
          deadLetterRoutingKey: `burguer`,
          messageTtl: 4000,
        },
      },
    });
  }
}
