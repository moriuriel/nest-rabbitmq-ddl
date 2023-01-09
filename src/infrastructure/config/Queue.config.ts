export type QueueType = {
  queueName: string;
  queueOptions: Record<string, unknown>;
};

export const BurgerQueue: QueueType = {
  queueName: 'burguer',
  queueOptions: {
    deadLetterExchange: '',
    deadLetterRoutingKey: `burguer.failed`,
  },
};

export const BurgerQueueDelay: QueueType = {
  queueName: 'burguer.delay',
  queueOptions: {
    deadLetterExchange: '',
    deadLetterRoutingKey: `burguer`,
    messageTtl: 4000,
  },
};
