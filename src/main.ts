import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './error/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true, // this will remove any properties that are not in the DTO
  }))

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3333);
}
bootstrap();
