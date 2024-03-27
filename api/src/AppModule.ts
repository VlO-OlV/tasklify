import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./modules/PrismaModule";
import { TaskModule } from "./modules/TaskModule";
import { ListModule } from "./modules/ListModule";
import Configuration from "./config/Configuration";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.development.env', '.env'],
            load: [Configuration],
        }),
        PrismaModule,
        TaskModule,
        ListModule,
    ],
})
export class AppModule {}