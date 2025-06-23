import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class FeaturesService {
  constructor(private prisma: PrismaService) {}

  async create(createFeatureDto: CreateFeatureDto) {
    return await this.prisma.feature.create({ data: createFeatureDto });
  }

  async findAll() {
    return await this.prisma.feature.findMany();
  }

  async update(id: number, updateFeatureDto: UpdateFeatureDto) {
    try {
      return await this.prisma.feature.update({
        where: { id },
        data: updateFeatureDto,
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('Feature was not found');
      }
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.feature.delete({
        where: { id },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('Feature was not found');
      }
    }
  }
}
