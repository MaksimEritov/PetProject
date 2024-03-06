import { Test, TestingModule } from "@nestjs/testing";
import { configServiceMock, configServiceMockValues, usersReportoryMock } from "./auth.mock";
import { ConfigService } from "@nestjs/config";
import { getRepositoryToken } from "@nestjs/typeorm";

import { AuthService } from "./auth.service";

import { UserRole } from "../../types/general.type";
import { UserEntity } from "./entities/user.entity";

describe("AuthService", () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthService],
            providers: [
                {
                    provide: ConfigService,
                    useFactory: () => configServiceMock,
                },
                {
                    provide: getRepositoryToken(UserEntity),
                    useFactory: () => usersReportoryMock,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    describe("signIn", () => {
        it("should not store a user if the username and password are incorrect", async () => {
            await service.signIn("wrongUsername", "wrongPassword");
            expect(usersReportoryMock.save).not.toHaveBeenCalled();
        });

        it("should return undefined if the username and password are incorrect", async () => {
            expect(service.signIn("wrongUsername", "wrongPassword")).resolves.toBeUndefined();
        });

        it("should store a user with token and user role if the username and password are correct for user", async () => {
            await service.signIn(configServiceMockValues.USERNAME, configServiceMockValues.PASSWORD);
            expect(usersReportoryMock.save).toHaveBeenCalledWith({
                role: UserRole.USER,
                sessionId: expect.any(String),
            });
        });

        it("should store a user with token and admin role if the username and password are correct for admin", async () => {
            await service.signIn(configServiceMockValues.USERNAME, configServiceMockValues.ADMIN_PASSWORD);
            expect(usersReportoryMock.save).toHaveBeenCalledWith({
                role: UserRole.ADMIN,
                sessionId: expect.any(String),
            });
        });

        it("should return a user with token and user role if the username and password are correct for user", async () => {
            expect(service.signIn(configServiceMockValues.USERNAME, configServiceMockValues.PASSWORD)).resolves.toEqual(
                {
                    role: UserRole.USER,
                    sessionId: expect.any(String),
                }
            );
        });
    });

    describe("getRoleBySessionId", () => {
        it("should return undefined if the user with sessionId not exist", async () => {
            expect(service.getRoleBySessionId("wrongSessionId")).resolves.toBeUndefined();
        });

        it("should return user role if the user with sessionId exist", async () => {
            expect(service.getRoleBySessionId("sessionId")).resolves.toEqual(UserRole.USER);
        });

        it("should return admin role if the user with sessionId exist", async () => {
            expect(service.getRoleBySessionId("adminSessionId")).resolves.toEqual(UserRole.ADMIN);
        });
    });
});
