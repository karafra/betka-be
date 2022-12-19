import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as path from 'path';
import { AppModule } from './app.module';

const packageJson = require(join(__dirname, '..', 'package.json'))
const logger = new Logger(path.basename(__filename).split('.')[0]);
let port;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const config = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const configService = app.get<ConfigService>(ConfigService);
  port = configService.get<number>('server.port') || 3000;
  
  await app.listen(port);
}

bootstrap()
  .then(() => logger.log(`🚀 App is running on port http://localhost:${port}/`))
  .catch((err) => logger.error(`❌ Could not start app (${err.message})`));
