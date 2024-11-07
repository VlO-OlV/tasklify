import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class BoardRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  private include = {
    lists: true,
    boardUsers: true,
  }

  async findAll (where: Prisma.BoardWhereInput) {
    return this.prisma.board.findMany({
      where,
      include: this.include,
    });
  }

  async findById (id: string) {
    return this.prisma.board.findFirst({
      where: { id },
      include: this.include,
    });
  }

  async create (data: Prisma.BoardUncheckedCreateInput) {
    return this.prisma.board.create({
      data,
    });
  }

  async updateById (id: string, data: Prisma.BoardUncheckedUpdateInput) {
    return this.prisma.board.update({
      where: { id },
      data,
    });
  }

  async deleteById (id: string) {
    return this.prisma.board.delete({
      where: { id },
    });
  }
}