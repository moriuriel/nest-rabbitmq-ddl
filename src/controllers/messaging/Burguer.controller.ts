import { Controller, Inject, Logger } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class BurgerController {
  readonly maxRetries = 4;
  constructor(
    @Inject('messaging-client-delay')
    private readonly rabbitMQClient: ClientProxy,
  ) {}
  @MessagePattern('MAKE_BURGER')
  create(@Payload() data: any, @Ctx() context: RmqContext) {
    const retryCount = (data.retryCount ?? 0) + 1;

    console.log('data', data, retryCount, retryCount >= this.maxRetries);

    if (retryCount >= this.maxRetries) {
      Logger.warn(
        `Emit failure for burger of ${data.customer}. Max retries exceeded.`,
      );

      context.getChannelRef().reject(context.getMessage(), false);
    } else {
      context.getChannelRef().ack(context.getMessage());
      this.rabbitMQClient.emit('MAKE_BURGER', { ...data, retryCount });
    }
  }
}
