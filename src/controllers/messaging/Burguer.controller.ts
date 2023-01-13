import { Controller, Inject } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { LoggerAdapter } from 'src/adapter/logger/Logger.adapter';
import { BurgerQueueDelay } from 'src/infrastructure/config';
import { RabbitMQAdapter } from 'src/infrastructure/queue/RabbitMQAdapter';
@Controller()
export class BurgerController {
  readonly maxRetries = 2;
  constructor(
    @Inject('messaging-client-delay')
    private readonly rabbitMQClient: RabbitMQAdapter,
    @Inject('logger') private readonly logger: LoggerAdapter,
  ) {
    rabbitMQClient.buildRabbitMQConnection(BurgerQueueDelay);
  }
  @MessagePattern('MAKE_BURGER')
  create(@Payload() data: any, @Ctx() context: RmqContext) {
    this.logger.setProcessName('CONSUMER_MAKE_BURGER');
    this.logger.setMessage(JSON.stringify(data));

    const hrstart = process.hrtime();

    const retryCount = (data.retryCount ?? 0) + 1;
    if (retryCount >= this.maxRetries) {
      this.logger.setProcessLog('Execute Delay Process!');
      this.logger.setProcessLog(
        `Emit failure for burger of ${data.customer}. Max retries exceeded.`,
      );
      context.getChannelRef().reject(context.getMessage(), false);
    } else {
      context.getChannelRef().ack(context.getMessage());

      this.logger.setProcessLog(`RetryCount: ${retryCount}`);

      this.rabbitMQClient.publish('MAKE_BURGER', { ...data, retryCount });
    }

    const hrend = process.hrtime(hrstart);

    this.logger.setProcessTime(hrend[1] / 100000);

    this.logger.sendLog();
  }
}
