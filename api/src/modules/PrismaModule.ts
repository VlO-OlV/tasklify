import { Global, Module } from "@nestjs/common";
import { TaskRepository } from "../api/database/repositories/TaskRepository";
import { ListRepository } from "../api/database/repositories/ListRepository";
import { PrismaService } from "../api/database/PrismaService";
import { UserRepository } from 'src/api/database/repositories/UserRepository';

@Global()
@Module({
    providers: [
        PrismaService,
        TaskRepository,
        ListRepository,
        UserRepository,
    ],
    exports: [
        PrismaService,
        TaskRepository,
        ListRepository,
        UserRepository,
    ],
})
export class PrismaModule {}