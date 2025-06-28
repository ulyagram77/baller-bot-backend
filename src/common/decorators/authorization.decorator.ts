import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../modules/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export function AuthorizationByJwt() {
  return applyDecorators(UseGuards(JwtGuard), ApiBearerAuth('access-token'));
}
