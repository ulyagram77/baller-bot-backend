import { ApiProperty } from '@nestjs/swagger';
import { Feature } from '@prisma/client';

export class FeatureDto implements Feature {
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
