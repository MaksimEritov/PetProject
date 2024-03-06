import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

import { UserRole } from "../../../types/general.type";

@Entity({ name: "users" })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 10 })
    role: UserRole;

    @Column({ type: "varchar", length: 50 })
    sessionId: string;

    @CreateDateColumn()
    createdAt: Date;
}
