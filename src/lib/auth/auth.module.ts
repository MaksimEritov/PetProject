import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthService } from "./auth.service";

import { UserEntity } from "./entities/user.entity";
import { AuthController } from "./auth.controller";

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([UserEntity])],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
