import { Injectable } from "@nestjs/common";
import { PrismaService } from "../PrismaService";
import { Prisma } from "@prisma/client";

@Injectable()
export class TaskRepository {
  
  constructor (
    private prisma: PrismaService
  ) {}

  private include = {
    assignee: true,
    list: true,
  }

  async create (data: Prisma.TaskUncheckedCreateInput) {
    return this.prisma.task.create({
      data,
    });
  }

  async deleteById (id: string) {
    return this.prisma.task.delete({
      where: {
        id: id,
      },
    });
  }

  async updateById (id: string, data: Prisma.TaskUncheckedUpdateInput) {
    return this.prisma.task.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async findById (id: string) {
    return this.prisma.task.findUnique({
      where: {
        id: id,
      },
      include: this.include,
    });
  }

  async findAll () {
    return this.prisma.task.findMany();
  }
}