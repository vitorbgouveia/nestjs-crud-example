import { Injectable, HttpService } from '@nestjs/common';
import { Pipeline } from '../pipeline/pipeline';
import { validPermissions } from '../pipeline/pipes/valid-permissions.pipeline';
import { validToken } from '../pipeline/pipes/valid-token.pipeline';
import { validUser } from '../pipeline/pipes/valid-user.pipeline';

@Injectable()
export class AuthService {
  constructor(public httpService: HttpService) {}

  async executeAuthPipeline(req) {
    const pipeline = new Pipeline();

    pipeline
      .addPipe(validToken)
      .addPipe(validUser)
      .addPipe(validPermissions);

    pipeline.processPipe(req);
  }
}
