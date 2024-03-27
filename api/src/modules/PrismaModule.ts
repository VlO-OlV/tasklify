import { Global, Module } from "@nestjs/common";
import { TaskRepository } from "../api/database/repositories/TaskRepository";
import { ListRepository } from "../api/database/repositories/ListRepository";
import { PrismaService } from "../api/database/PrismaService";

@Global()
@Module({
    providers: [
        PrismaService,
        TaskRepository,
        ListRepository,
    ],
    exports: [
        PrismaService,
        TaskRepository,
        ListRepository,
    ],
})
export class PrismaModule {}