import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from 'src/utils/exceptions/InvalidEntityIdException';
import { BoardRepository } from '../database/repositories/BoardRepository';

@Injectable()
export class BoardByIdPipe implements PipeTransform {
  constructor (
    private boardRepository: BoardRepository,
  ) {}

  async transform(boardId: string) {
    const board = await this.boardRepository.findById(boardId);
    if (!board) {
      throw new InvalidEntityIdException('Board');
    }
    return boardId;
  }
}