import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Injectable()
export class FeaturesService {
  constructor(private prisma: PrismaService) {}

  async create(createFeatureDto: CreateFeatureDto) {
    try {
      return await this.prisma.feature.create({ data: createFeatureDto });
    } catch {
      throw new Error('Failed to connect to the database');
    }
  }

  async findAll() {
    try {
      return await this.prisma.feature.findMany();
    } catch {
      throw new Error('Failed to connect to the database');
    }
  }

  async update(id: number, updateFeatureDto: UpdateFeatureDto) {
    try {
      return await this.prisma.feature.update({
        where: { id },
        data: updateFeatureDto,
      });
    } catch {
      throw new Error('Failed to connect to the database');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.feature.delete({
        where: { id },
      });
    } catch {
      throw new Error('Failed to connect to the database');
    }
  }
}
