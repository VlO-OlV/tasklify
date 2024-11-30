import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateTaskDTO } from "../dtos/CreateTaskDTO";
import { TaskService } from "../services/TaskService";
import { UpdateTaskDTO } from "../dtos/UpdateTaskDTO";
import { TaskByIdPipe } from "../pipes/TaskByIdPipe";
import { JwtGuard } from 'src/security/JwtGuard';
import { BoardRoles } from 'src/utils/decorators/BoardRoles';
import { BoardRole } from '@prisma/client';
import { BoardRolesGuard } from 'src/security/boardRoles/BoardRolesGuard';

@Controller('/tasks')
export class TaskController {

  constructor (
    private taskService: TaskService,
  ) {}

  @BoardRoles(BoardRole.ADMIN, BoardRole.MODERATOR)
  @UseGuards(JwtGuard, BoardRolesGuard)
  @Post()
  async createTask (
    @Body() body: CreateTaskDTO,
  ) {
    const createdTask = await this.taskService.create(body);
    return createdTask;
  }

  @BoardRoles(BoardRole.ADMIN, BoardRole.MODERATOR)
  @UseGuards(JwtGuard, BoardRolesGuard)
  @Delete('/:taskId')
  async deleteTaskById (
    @Param('taskId', TaskByIdPipe) id: string,
  ) {
    const deletedTask = await this.taskService.deleteById(id);
    return deletedTask;
  }
  
  @BoardRoles(BoardRole.ADMIN, BoardRole.MODERATOR)
  @UseGuards(JwtGuard, BoardRolesGuard)
  @Patch('/:taskId')
  async updateTaskById (
    @Param('taskId', TaskByIdPipe) id: string,
    @Body() body: UpdateTaskDTO,
  ) {
    const updatedTask = await this.taskService.updateById(id, body);
    return updatedTask;
  }

  @UseGuards(JwtGuard, BoardRolesGuard)
  @Get('/:taskId')
  async getTaskById (
    @Param('taskId', TaskByIdPipe) id: string,
  ) {
    const task = await this.taskService.getById(id);
    return task;
  }
}