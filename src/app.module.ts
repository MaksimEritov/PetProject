import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EventBusModule } from "./lib/eventBus/eventBus.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "postgres",
            database: "bot",
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
            autoLoadEntities: true,
            synchronize: true,
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env",
        }),
        EventBusModule,
    ],
})
export class AppModule {}
