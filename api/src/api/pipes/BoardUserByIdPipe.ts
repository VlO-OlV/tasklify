import { Injectable, PipeTransform } from '@nestjs/common';
import { BoardUserRepository } from '../database/repositories/BoardUserRepository';
import { InvalidEntityIdException } from 'src/utils/exceptions/InvalidEntityIdException';

@Injectable()
export class BoardUserByIdPipe implements PipeTransform {
  constructor (
    private boardUserRepository: BoardUserRepository,
  ) {}

  async transform(boardUserId: string) {
    const board = await this.boardUserRepository.findById(boardUserId);
    if (!board) {
      throw new InvalidEntityIdException('Board user');
    }
    return boardUserId;
  }
}