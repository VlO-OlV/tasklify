import { BoardRole } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateBoardUserDTO {
  @IsEnum(BoardRole, {message: 'The board role must be a value from enum'})
  @IsOptional()
    userRole?: BoardRole;
}