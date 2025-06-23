import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateFeatureDto {
  @ApiProperty({
    example: 'Dark Mode',
    description: 'Feature title',
    minLength: 1,
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  title: string;

  @ApiProperty({
    description: 'Feature description',
    example: 'Toggle between light and dark themes',
    minLength: 1,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  description: string;
}
