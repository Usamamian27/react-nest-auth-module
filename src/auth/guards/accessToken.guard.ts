import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../../user/user.service';
import { IS_PUBLIC_KEY } from '../decorators/auth.decorator';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(AccessTokenGuard.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      return false;
    }

    try {
      const decoded = this.jwtService.verify(token.split(' ')[1], {
        secret: this.configService.get('JWT_SECRET'),
      });
      const user = await this.userService.findOne(decoded.userId);
      request.user = user;
      return true;
    } catch (error) {
      this.logger.error(`Error in Access Token Guard ${JSON.stringify(error)}`);
      return false;
    }
  }
}
