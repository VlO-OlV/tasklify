import { Module } from "@nestjs/common";
import { TaskController } from "../api/controllers/TaskController";
import { TaskService } from "../api/services/TaskService";

@Module({
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}