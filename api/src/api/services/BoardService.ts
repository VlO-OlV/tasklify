import { Injectable } from '@nestjs/common';
import { BoardRepository } from '../database/repositories/BoardRepository';
import { CreateBoardDTO } from '../dtos/CreateBoardDTO';
import { BoardUserRepository } from '../database/repositories/BoardUserRepository';
import { BoardRole } from '@prisma/client';
import { UpdateBoardDTO } from '../dtos/UpdateBoardDTO';
import { ListRepository } from '../database/repositories/ListRepository';
import { TaskRepository } from '../database/repositories/TaskRepository';

@Injectable()
export class BoardService {
  constructor (
    private boardRepository: BoardRepository,
    private boardUserRepository: BoardUserRepository,
    private listRepository: ListRepository,
    private taskRepository: TaskRepository,
  ) {}

  async create (userId: string, body: CreateBoardDTO) {
    const newBoard = await this.boardRepository.create(body);
    await this.boardUserRepository.create({
      userId,
      boardId: newBoard.id,
      userRole: BoardRole.ADMIN,
    });
    return this.boardRepository.findById(newBoard.id);
  }

  async updateById (boardId: string, body: UpdateBoardDTO) {
    return this.boardRepository.updateById(boardId, body);
  }

  async deleteById (boardId: string) {
    return this.boardRepository.deleteById(boardId);
  }

  async getById (boardId: string){
    return this.boardRepository.findById(boardId);
  }

  async getBoardLists (boardId: string) {
    return this.listRepository.findAll({ boardId });
  }

  async getBoardTasks (boardId: string) {
    return this.taskRepository.findAll({
      list: {
        boardId,
      },
    });
  }
}