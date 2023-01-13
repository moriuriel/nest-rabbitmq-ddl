import { Inject, Injectable, Scope } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { LoggerAdapter } from 'src/adapter/logger/Logger.adapter';
import { QueueType } from '../config';
@Injectable({ scope: Scope.DEFAULT })
export class RabbitMQAdapter {
  private client: ClientProxy;

  constructor(@Inject('logger') private readonly logger: LoggerAdapter) {}

  public buildRabbitMQConnection(options: QueueType): void {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: options.queueName,
        noAck: false,
        queueOptions: options.queueOptions,
      },
    });
  }

  public publish<MessageType>(pattern: string, message: MessageType) {
    this.logger.setProcessName('QUEUE_ADAPTER');
    this.logger.setHeader('APP-NAME', 'localhost');

    this.logger.setMessage(JSON.stringify(message));

    const hrstart = process.hrtime();

    this.logger.setProcessLog(`Pattern: ${pattern}`);

    this.client.emit(pattern, message);

    this.logger.setProcessLog('Ok');

    const hrend = process.hrtime(hrstart);

    this.logger.setProcessTime(hrend[1] / 100000);

    this.logger.sendLog();
  }
}
