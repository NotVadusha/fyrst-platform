import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Fyrst')
  .setDescription('Fyrst API description')
  .setVersion('1.0')
  .build();
