import 'tsconfig-paths/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const docCfg = new DocumentBuilder()
    .setTitle('Baller Bot API')
    .setDescription(
      'Here you can find all the endpoints of the Baller Bot API an its client',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, docCfg);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
