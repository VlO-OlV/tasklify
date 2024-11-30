import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../database/repositories/TaskRepository";
import { Prisma } from "@prisma/client";

@Injectable()
export class TaskService {

  constructor (
    private taskRepository: TaskRepository,
  ) {}

  async create (
    body: Prisma.TaskUncheckedCreateInput
  ) {
    const createdTask = await this.taskRepository.create(body);
    return createdTask;
  }

  async deleteById (
    id: string
  ) {
    const deletedTask = await this.taskRepository.deleteById(id);
    return deletedTask;
  }

  async updateById (
    id: string,
    data: Prisma.TaskUncheckedUpdateInput
  ) {
    const updatedTask = await this.taskRepository.updateById(id, data);
    return updatedTask;
  }

  async getById (
    id: string
  ) {
    const task = await this.taskRepository.findById(id);
    return task;
  }
}