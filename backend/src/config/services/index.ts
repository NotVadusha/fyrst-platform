import { ClientOptions, Transport } from '@nestjs/microservices';

export const invoiceService: ClientOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],
    queue: 'invoice_queue',
    queueOptions: {
      durable: false,
    },
  },
};
