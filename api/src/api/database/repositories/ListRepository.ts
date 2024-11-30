import { Injectable } from "@nestjs/common";
import { PrismaService } from "../PrismaService";
import { Prisma } from "@prisma/client";

@Injectable()
export class ListRepository {

  constructor (
    private prisma: PrismaService,
  ) {}

  include = {
    tasks: true,
  }

  async create (data: Prisma.ListUncheckedCreateInput) {
    return this.prisma.list.create({
      data,
    });
  }

  async updateById (id: string, data: Prisma.ListUncheckedUpdateInput) {
    return this.prisma.list.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async deleteById (id: string) {
    return this.prisma.list.delete({
      where: {
        id: id,
      },
    });
  }

  async findById (id: string) {
    return this.prisma.list.findUnique({
      where: {
        id: id,
      },
      include: this.include,
    });
  }

  async findAll (where: Prisma.ListWhereInput) {
    return this.prisma.list.findMany({ where });
  }
}