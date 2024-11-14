import { Injectable } from '@nestjs/common';
import { BoardUserRepository } from '../database/repositories/BoardUserRepository';
import { CreateBoardUserDTO } from '../dtos/CreateBoardUserDTO';
import { UpdateBoardUserDTO } from '../dtos/UpdateBoardUserDTO';

@Injectable()
export class BoardUserService {
  constructor (
    private boardUserRepository: BoardUserRepository,
  ) {}

  async getMy (userId: string) {
    return this.boardUserRepository.findAll({ userId });
  }

  async create (body: CreateBoardUserDTO) {
    return this.boardUserRepository.create(body);
  }

  async updateById (boardUserId: string, body: UpdateBoardUserDTO) {
    return this.boardUserRepository.updateById(boardUserId, body);
  }
  
  async deleteById (boardUserId: string) {
    return this.boardUserRepository.deleteById(boardUserId);
  }
}