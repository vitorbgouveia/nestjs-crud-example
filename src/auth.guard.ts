import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AuthService } from './infrastructure/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.route.path === '/api/status') { return true; }

    return this.authService.executeAuthPipeline(request)
      .then(() => true )
      .catch((err) => { throw err; } );
  }

}
