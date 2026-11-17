import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { UserLogin } from './jwt.strategy';

// Authentication: memastikan request membawa JWT yang valid
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// Authorization: memastikan role user diizinkan, contoh @Roles('ADMIN')
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const dibutuhkan = this.reflector.getAllAndOverride<Role[] | undefined>(
      ROLES_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );
    if (!dibutuhkan?.length) return true;
    const user = ctx.switchToHttp().getRequest<{ user?: UserLogin }>().user;
    return !!user && dibutuhkan.includes(user.role);
  }
}

// Mengambil user yang sedang login di controller: @UserSaatIni() user
export const UserSaatIni = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserLogin =>
    ctx.switchToHttp().getRequest<{ user: UserLogin }>().user,
);
