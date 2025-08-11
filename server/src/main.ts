import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const FRONTEND_URL = config.get('FRONTEND_URL') || 'http://localhost:3000';
app.use(cookieParser()); 

  app.enableCors({ origin: FRONTEND_URL, credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = config.get('PORT') || 5000;
  await app.listen(port);
  console.log(`Server listening on ${port}`);
}
bootstrap();
