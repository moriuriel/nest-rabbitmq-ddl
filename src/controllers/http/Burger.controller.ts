import { Body, Controller, Inject, Injectable, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller({ version: '1' })
@Injectable()
export class BurgerController {
  constructor(
    @Inject('messaging-client') private readonly rabbitMQClient: ClientProxy,
  ) {}

  @Post('/burgers')
  create(@Body() data) {
    this.rabbitMQClient.emit('MAKE_BURGER', data);
  }
}