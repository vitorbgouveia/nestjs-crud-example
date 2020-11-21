import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Exemplo } from '../../domain/entity/exemplo.entity';

import { ExemploController } from './controller/exemplo-controller.controler';

import { ExemploService } from './service/exemplo.service';

@Module({
    imports    : [ TypeOrmModule.forFeature([Exemplo]) ],
    providers  : [ ExemploService ],
    exports    : [ ExemploService ],
    controllers: [ ExemploController ]
})
export class ExemploModule {}