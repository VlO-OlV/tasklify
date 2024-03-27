import { Module } from "@nestjs/common";
import { ListController } from "../api/controllers/ListController";
import { ListService } from "../api/services/ListService";

@Module({
    controllers: [ListController],
    providers: [ListService],
})
export class ListModule {}