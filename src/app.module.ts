import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';

import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from './application/application.module';

import { AuthService } from './infrastructure/services/auth.service';
import { HttpExceptionFilter } from './infrastructure/http-exception.filter';

import { connections } from './infrastructure/connEnums';
const env = process.env.NODE_ENV || 'development';
const config = connections[env];

@Module({
  imports: [
  TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      autoLoadEntities: true,
      logging: config.logging
    }),
    ApplicationModule, HttpModule
  ],
  controllers: [AppController],
  providers: [AuthService, { provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule {}
