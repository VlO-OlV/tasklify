import { Module } from "@nestjs/common";
import { TaskController } from "./api/controllers/TaskController";
import { TaskService } from "./api/services/TaskService";
import { ListController } from "./api/controllers/ListController";
import { ListService } from "./api/services/ListService";

@Module({
    controllers: [TaskController, ListController],
    providers: [TaskService, ListService],
})
export class AppModule {}