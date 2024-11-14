import { BoardRole } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBoardUserDTO {
  @IsUUID(undefined, {message: 'User id should be UUID'})
  @IsNotEmpty({message: 'User id cannot be empty'})
    userId: string;

  @IsUUID(undefined, {message: 'Board id should be UUID'})
  @IsNotEmpty({message: 'Board id cannot be empty'})
    boardId: string;

  @IsEnum(BoardRole, {message: 'The board role must be a value from enum'})
    userRole: BoardRole;
}