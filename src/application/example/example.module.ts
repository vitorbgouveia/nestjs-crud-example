import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Example } from '../../domain/entity/example.entity';

import { ExampleService } from './service/example.service';

import { ExampleController } from './controller/example-controller.controler';

@Module({
    imports    : [ TypeOrmModule.forFeature([Example]) ],
    providers  : [ ExampleService ],
    exports    : [ ExampleService ],
    controllers: [ ExampleController ]
})
export class ExampleModule {}