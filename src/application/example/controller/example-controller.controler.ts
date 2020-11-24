import { Controller } from '@nestjs/common';

import { ExampleService } from './../service/example.service';

import { ApiTags } from '@nestjs/swagger';

import { Example } from '../../../domain/entity/example.entity';
import { FormExampleDto } from '../../../domain/dto/form-example.dto';

import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
    model : { type: Example },
    dto   : { create: FormExampleDto, update: FormExampleDto },
})
@ApiTags('Example')
@Controller('example')
export class ExampleController implements CrudController<Example> {
    constructor(public service: ExampleService) {}
}
