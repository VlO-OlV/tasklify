import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class BoardUserRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async create (data: Prisma.BoardUserUncheckedCreateInput) {
    return this.prisma.boardUser.create({
      data,
    });
  }

  async updateById (id: string, data: Prisma.BoardUserUncheckedUpdateInput) {
    return this.prisma.boardUser.update({
      where: { id },
      data,
    });
  }

  async deleteById (id: string) {
    return this.prisma.boardUser.delete({
      where: { id },
    });
  }

  async findAll (where: Prisma.BoardUserWhereInput) {
    return this.prisma.boardUser.findMany({
      where,
    });
  }

  async findById (id: string) {
    return this.prisma.boardUser.findFirst({
      where: { id },
    });
  }
}