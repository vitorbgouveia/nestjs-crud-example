import { HttpService, Injectable } from '@nestjs/common';

import { Pipeline } from '../pipeline/pipeline';
import { validaToken } from '../pipeline/pipes/valida-token.pipeline';
import { validaUsuario } from '../pipeline/pipes/valida-usuario.pipeline';
import { validaPermissoes } from '../pipeline/pipes/valida-permissoes.pipeline';

@Injectable()
export class AuthService {
  constructor(public httpService: HttpService) {}

  async executeAuthPipeline(req) {
    const pipeline = new Pipeline();

    pipeline
      .addPipe(validaToken)
      .addPipe(validaUsuario)
      .addPipe(validaPermissoes);

    pipeline.processPipe(req);
  }
}
