import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Exemplo } from '../../../domain/entity/exemplo.entity';

import { CrudService } from '../../../infrastructure/services/crud.service';

@Injectable()
export class ExemploService extends CrudService<Exemplo> {
    constructor(@InjectRepository(Exemplo) repo: Repository<Exemplo>) {
        super(repo);
    }
}
