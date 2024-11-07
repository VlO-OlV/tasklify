import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { BoardUserRepository } from 'src/api/database/repositories/BoardUserRepository';
import { ListRepository } from 'src/api/database/repositories/ListRepository';
import { TaskRepository } from 'src/api/database/repositories/TaskRepository';
import { NoPermissionException } from 'src/utils/exceptions/NoPermissionException';

@Injectable()
export class BoardRolesGuard implements CanActivate {
  constructor (
    private reflector: Reflector,
    private boardUserRepository: BoardUserRepository,
    private taskRepository: TaskRepository,
    private listRepository: ListRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const boardRoles = this.reflector.get<string[]>('boardRoles', context.getHandler());
    const taskId = request.params['taskId'] ?? request.body['taskId'];
    const listId = request.params['listId'] ?? request.body['listId'];
    const boardId = request.params['boardId'] ?? request.body['boardId'];
    
    if (taskId) {
      const task = await this.taskRepository.findById(taskId);
      const taskBoardId = task.list.boardId;
      return await this.checkUserRole(request.user['id'], taskBoardId, boardRoles);
    }

    if (listId) {
      const list = await this.listRepository.findById(listId);
      const listBoardId = list.boardId;
      return await this.checkUserRole(request.user['id'], listBoardId, boardRoles);
    }

    if (boardId) {
      return await this.checkUserRole(request.user['id'], boardId, boardRoles);
    }
    
    return true;
  }

  async checkUserRole (userId, boardId, boardRoles) {
    const boardUser = await this.boardUserRepository.find({ userId, boardId });
    if (!boardUser) {
      throw new NoPermissionException();
    }
    if (!boardRoles || boardRoles.some((boardRole) => boardRole === boardUser.userRole)) {
      return true;
    }
    throw new NoPermissionException();
  }
}