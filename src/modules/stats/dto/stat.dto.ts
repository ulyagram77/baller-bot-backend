import { ApiProperty } from '@nestjs/swagger';
import { UserStats } from '@prisma/client';

export class StatDto implements UserStats {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  totalGamesPlayed: number;

  @ApiProperty()
  bestShotStreak: number;

  @ApiProperty({
    type: 'object',
    properties: {
      name: { type: 'string', example: 'John Doe' },
    },
  })
  user: {
    name: string;
  };

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
