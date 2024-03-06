import { randomUUID } from "crypto";

import { UserRole } from "../../types/general.type";

export const configServiceMockValues = {
    USERNAME: "username",
    PASSWORD: "password",
    ADMIN_PASSWORD: "admin_password",
};

export const configServiceMock = {
    get: jest.fn().mockImplementation((key: keyof typeof configServiceMockValues) => configServiceMockValues[key]),
};

export const usersReportoryMock = {
    save: jest.fn().mockImplementation(({ role }: { role: string }) => ({ role, sessionId: randomUUID() })),
    findOne: jest.fn().mockImplementation(({ where: { sessionId } }: { where: { sessionId: string } }) => {
        if (sessionId === "wrongSessionId") {
            return undefined;
        }
        return {
            role: sessionId === "adminSessionId" ? UserRole.ADMIN : UserRole.USER,
        };
    }),
};
