import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(public jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    try {
      const authHeader = request.headers.authorization;
      const [acessTokenType, accessToken] = authHeader.split(' ');
      if (acessTokenType !== 'Bearer' || !accessToken) {
        throw new UnauthorizedException('User unauthorized');
      }
      const user = await this.jwtService.verifyAsync(accessToken);
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('User unauthorized');
    }
  }
}
