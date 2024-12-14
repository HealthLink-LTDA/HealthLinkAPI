import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './cargo.decorator';

@Injectable()
export class CargoGuard implements CanActivate {
  private readonly logger = new Logger(CargoGuard.name);

  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      this.logger.log('No roles required for this route');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      this.logger.warn(
        `Unauthorized access attempt. Request does not include a user.`,
      );
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    this.logger.log(
      `User with role '${user.role}' attempting to access a route requiring roles: [${requiredRoles.join(
        ', ',
      )}]`,
    );

    if (!requiredRoles.includes(user.role)) {
      this.logger.warn(
        `Access denied for user with role '${user.role}'. Required roles: [${requiredRoles.join(
          ', ',
        )}]`,
      );
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    this.logger.log(
      `Access granted for user with role '${user.role}' to route requiring roles: [${requiredRoles.join(
        ', ',
      )}]`,
    );
    return true;
  }
}
