import { Body, Controller, Inject, Injectable, Post } from '@nestjs/common';
import { LoggerAdapter } from 'src/adapter/logger/Logger.adapter';
import { CreateBurgerInput } from 'src/application/contracts/input/CreateBurger.input';

import { BurgerQueue } from 'src/infrastructure/config';
import { RabbitMQAdapter } from 'src/infrastructure/queue/RabbitMQAdapter';
@Controller({ version: '1' })
@Injectable()
export class BurgerController {
  constructor(
    @Inject('messaging-client')
    private readonly rabbitMQClient: RabbitMQAdapter,
    @Inject('logger') private readonly logger: LoggerAdapter,
  ) {
    rabbitMQClient.buildRabbitMQConnection(BurgerQueue);
  }

  @Post('/burgers')
  create(@Body() data: CreateBurgerInput) {
    this.logger.setProcessName('SEND_MAKE_BURGER');
    this.logger.setMessage(JSON.stringify(data));

    const hrstart = process.hrtime();

    this.logger.setProcessLog('Send to queue');

    this.rabbitMQClient.publish('MAKE_BURGER', data);

    const hrend = process.hrtime(hrstart);

    this.logger.setProcessTime(hrend[1] / 100000);

    this.logger.sendLog();

    return data;
  }
}
