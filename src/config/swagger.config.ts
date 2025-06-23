import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerDoc = new DocumentBuilder()
  .setTitle('Baller Bot API')
  .setDescription(
    'Here you can find all the endpoints of the Baller Bot API an its client',
  )
  .setVersion('1.0')
  .build();
