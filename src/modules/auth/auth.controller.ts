import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginRequestDto } from './dto/login.dto';
import type { Request, Response } from 'express';
import { AuthResponseDto } from './dto/auth.dto';
import { Authorized } from '../../common/decorators/autorized.decorator';
import { User } from '@prisma/client';
import { Authorization } from '../../common/decorators/authorization.decorator';

@Controller('auth')
@ApiTags('Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Creates an account',
    description: 'Registering new user and returning access token',
  })
  @ApiCreatedResponse({ type: AuthResponseDto })
  @ApiConflictResponse({ description: 'User with this email already exists' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequestDto,
  ) {
    return await this.authService.register(res, dto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login to account',
    description: 'Autorizing user and returning access token',
  })
  @ApiCreatedResponse({ type: AuthResponseDto })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiNotFoundResponse({ description: 'User was not found' })
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequestDto,
  ) {
    return await this.authService.login(res, dto);
  }

  @Post('logout')
  @ApiOperation({
    summary: 'Logout from the account',
  })
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh the access token',
    description: 'Generates a new access token',
  })
  @ApiCreatedResponse({ type: AuthResponseDto })
  @ApiUnauthorizedResponse({ description: 'Expired refresh token' })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refresh(req, res);
  }

  @Get('me')
  @ApiOperation({
    summary: 'Get user info (only for testing purposes)',
  })
  @ApiBearerAuth('access-token')
  @Authorization()
  me(@Authorized() user: User) {
    return user;
  }
}
