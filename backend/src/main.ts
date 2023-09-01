import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

const port = parseInt(process.env.PORT) || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
