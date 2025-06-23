import { ApiProperty } from '@nestjs/swagger';
import { Feature } from '@prisma/client';

export class FeatureEntity implements Feature {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
