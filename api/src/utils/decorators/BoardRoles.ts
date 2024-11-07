import { SetMetadata } from '@nestjs/common';
import { BoardRole } from '@prisma/client';

export const BoardRoles = (...boardRoles: BoardRole[]) => SetMetadata('boardRoles', boardRoles);