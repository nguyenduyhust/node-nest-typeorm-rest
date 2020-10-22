import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from '@api/services';
import { ErrorHelper } from '@base/helpers';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: any, res: any, next: () => void) {
    // validate request
    const user = await this.authService.validateRequest(req);
    if (!user) {
      ErrorHelper.UnauthorizedException('Unauthorized');
    }
    req.user = user;
    next();
  }
}
