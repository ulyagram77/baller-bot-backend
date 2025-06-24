import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import type { Request } from 'express';

export const Authorized = createParamDecorator(
  (
    data: keyof User | undefined,
    ctx: ExecutionContext,
  ): User[keyof User] | User => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request.user as User;

    if (!user) {
      throw new Error('No user found in request. Ensure AuthGuard is applied.');
    }

    return data ? user[data] : user;
  },
);
