import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  console.log(`Starting process with database hosted on ${process.env.DB_HOST}...\n`);

  const app = await NestFactory.create(AppModule);

  // declare every route as API
  app.setGlobalPrefix('api');

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
