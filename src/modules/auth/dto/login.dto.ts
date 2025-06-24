import { PickType } from '@nestjs/swagger';
import { RegisterRequestDto } from './register.dto';

export class LoginRequestDto extends PickType(RegisterRequestDto, [
  'email',
  'password',
] as const) {}
