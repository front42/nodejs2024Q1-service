import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const doc = await readFile(join(__dirname, '..', 'doc', 'api.yaml'), 'utf-8');
  SwaggerModule.setup('doc', app, parse(doc));

  await app.listen(PORT);
}
bootstrap();
