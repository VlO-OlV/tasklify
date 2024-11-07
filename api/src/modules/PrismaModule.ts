import { Global, Module } from "@nestjs/common";
import { TaskRepository } from "../api/database/repositories/TaskRepository";
import { ListRepository } from "../api/database/repositories/ListRepository";
import { PrismaService } from "../api/database/PrismaService";
import { UserRepository } from 'src/api/database/repositories/UserRepository';
import { BoardRepository } from 'src/api/database/repositories/BoardRepository';
import { BoardUserRepository } from 'src/api/database/repositories/BoardUserRepository';

@Global()
@Module({
  providers: [
    PrismaService,
    TaskRepository,
    ListRepository,
    UserRepository,
    BoardRepository,
    BoardUserRepository,
  ],
  exports: [
    PrismaService,
    TaskRepository,
    ListRepository,
    UserRepository,
    BoardRepository,
    BoardUserRepository,
  ],
})
export class PrismaModule {}