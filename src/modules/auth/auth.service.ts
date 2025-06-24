import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma.service';
import { RegisterRequestDto } from './dto/register.dto';
import { hash, verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dto/login.dto';
import type { Request, Response } from 'express';
import { isDevMode } from 'src/config/core.config';
import ms, { StringValue } from 'ms';

export interface JwtPayload {
  id: string;
}

interface RequestWithCookies extends Request {
  cookies: Record<string, string>;
}

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: StringValue;
  private readonly JWT_REFRESH_TOKEN_TTL: StringValue;
  private readonly COOKIE_DOMAIN: string;

  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = this.configService.getOrThrow<StringValue>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow<StringValue>(
      'JWT_REFRESH_TOKEN_TTL',
    );
    this.COOKIE_DOMAIN = this.configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  async register(res: Response, dto: RegisterRequestDto) {
    const { name, email, password } = dto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser)
      throw new ConflictException('User with this email already exists');

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password),
      },
    });

    return this.auth(res, user.id);
  }

  async login(res: Response, dto: LoginRequestDto) {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) throw new NotFoundException('User was not found');

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) throw new NotFoundException('User was not found');

    return this.auth(res, user.id);
  }

  logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0));
    return true;
  }

  async refresh(req: RequestWithCookies, res: Response) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) throw new UnauthorizedException('Expired refresh token');

    const payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken);

    if (payload) {
      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
        select: { id: true },
      });

      if (!user) throw new NotFoundException('User was not found');

      return this.auth(res, user.id);
    }
  }

  async validate(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('User was not found');

    return user;
  }

  private auth(res: Response, userId: string) {
    const { accessToken, refreshToken } = this.generateTokens(userId);
    const refreshTokenTtlMs = ms(this.JWT_REFRESH_TOKEN_TTL);

    this.setCookie(res, refreshToken, new Date(Date.now() + refreshTokenTtlMs));
    return { accessToken };
  }

  private generateTokens(userId: string) {
    const payload: JwtPayload = { id: userId };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return { accessToken, refreshToken };
  }

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: !isDevMode(this.configService),
      sameSite: isDevMode(this.configService) ? 'none' : 'lax',
    });
  }
}
