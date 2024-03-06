import { randomUUID } from "crypto";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserRole } from "../../types/general.type";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    private readonly username: string;
    private readonly password: string;
    private readonly admin_password: string;

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {
        const username = this.configService.get<string>("USERNAME");
        const password = this.configService.get<string>("PASSWORD");
        const admin_password = this.configService.get<string>("ADMIN_PASSWORD");
        if (!username || !password || !admin_password) {
            this.logger.warn("No username or password provided");
        }
        this.username = username ?? "user";
        this.password = password ?? "pwd";
        this.admin_password = admin_password ?? "spwd";
    }

    async signIn(username: string, password: string): Promise<{ role: UserRole; sessionId: string } | undefined> {
        if (username === this.username && password === this.password) {
            const response = await this.userRepository.save({
                role: UserRole.USER,
                sessionId: randomUUID(),
            });
            return response;
        }
        if (username === this.username && password === this.admin_password) {
            const response = await this.userRepository.save({
                role: UserRole.ADMIN,
                sessionId: randomUUID(),
            });
            return response;
        }
    }

    async getRoleBySessionId(sessionId: string): Promise<UserRole | undefined> {
        const user = await this.userRepository.findOne({ where: { sessionId } });
        if (!user) {
            return undefined;
        }
        return user.role;
    }
}
