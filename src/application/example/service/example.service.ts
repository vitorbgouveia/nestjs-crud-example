import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Example } from '../../../domain/entity/example.entity';

@Injectable()
export class ExampleService extends TypeOrmCrudService<Example> {
    constructor(@InjectRepository(Example) repo: Repository<Example>) {
        super(repo);
    }
}
