import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateStatDto {
  @ApiProperty({
    example: 'uuid-string-here',
    description: 'User ID',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 0,
    description: 'Total games played by user',
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalGamesPlayed?: number;

  @ApiProperty({
    example: 0,
    description: 'Best shot streak achieved',
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  bestShotStreak?: number;
}
