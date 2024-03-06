import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";

import { UserRole } from "../../types/general.type";

export class SignInRequestDTO {
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}

export class SignInResponseDTO {
    @ApiProperty()
    @IsNotEmpty()
    session: string;

    @ApiProperty()
    @IsEnum(UserRole)
    role: UserRole;
}
