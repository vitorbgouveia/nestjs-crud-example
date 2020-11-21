import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import dotenv = require('dotenv');
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './infrastructure/services/auth.service';

dotenv.config();
const apm = require('elastic-apm-node').start({ ignoreUrls: [/\/api\/status/s] });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle(`API ${process.env.SERVICE_NICK_NAME}`)
  .setVersion('1.0')
  .addServer('/', 'For using on development')
  .setContact('Contact', 'https://www.com.br', 'email@email.com.br')
  .build();

  app.useGlobalGuards(new AuthGuard(app.get(AuthService)));

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  await app.listen(3000);

  if (apm.isStarted()) {
    console.log('APM running');
  }
}
bootstrap();
