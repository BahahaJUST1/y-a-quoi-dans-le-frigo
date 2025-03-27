import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuration } from './database/configuration';

async function bootstrap() {

  console.log(configuration());

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://y-a-quoi-dans-le-frigo.fr',
      'https://y-a-quoi-dans-le-frigo.com',
      'https://y-a-quoi-dans-le-frigo.online'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(3000);
}
bootstrap();
