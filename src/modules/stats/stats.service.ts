import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { PrismaService } from 'src/config/database/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  //*INFO: here I am using prisma upsert instead of throwing exception for create method just for practise
  async create(createStatDto: CreateStatDto) {
    try {
      return await this.prisma.userStats.upsert({
        where: { userId: createStatDto.userId },
        update: createStatDto,
        create: createStatDto,
        include: { user: { select: { name: true } } },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2003') {
        throw new NotFoundException('User was not found');
      }
      throw e;
    }
  }

  async findAll() {
    return await this.prisma.userStats.findMany({
      include: { user: { select: { name: true } } },
    });
  }

  async findOne(id: number) {
    const userStats = await this.prisma.userStats.findUnique({
      where: { id },
      include: { user: { select: { name: true } } },
    });

    if (!userStats) {
      throw new NotFoundException('User statistics not found');
    }

    return userStats;
  }

  async update(id: number, updateStatDto: UpdateStatDto) {
    try {
      return await this.prisma.userStats.update({
        where: { id },
        data: updateStatDto,
        include: { user: { select: { name: true } } },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('User statistics was not found');
      }
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2003') {
        throw new NotFoundException('User was not found');
      }
      throw e;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.userStats.delete({
        where: { id },
        include: { user: { select: { name: true } } },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('User statistics not found');
      }
      throw e;
    }
  }
}
