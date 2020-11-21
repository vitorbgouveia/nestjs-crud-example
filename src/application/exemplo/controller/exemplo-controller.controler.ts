import { Controller } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { Exemplo } from '../../../domain/entity/exemplo.entity';
import { FormExemploDto } from '../../../domain/dto/form-exemplo.dto';

import { ExemploService } from '../service/exemplo.service';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
    model : { type: Exemplo },
    dto   : { create: FormExemploDto, update: FormExemploDto },
    routes: { exclude: ['createOneBase'] }
})
@ApiTags('Exemplo')
@Controller('exemplo')
export class ExemploController implements CrudController<Exemplo> {
    constructor(public service: ExemploService) {}
}
