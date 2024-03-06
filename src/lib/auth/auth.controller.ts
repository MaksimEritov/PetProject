import { BadRequestException, Body, Controller, HttpStatus, NotFoundException, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";

import { SignInRequestDTO, SignInResponseDTO } from "./auth.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: "Sign In" })
    @ApiResponse({ status: HttpStatus.OK, type: SignInResponseDTO })
    @Post("/signIn")
    async singIn(@Body() body: SignInRequestDTO) {
        if (!body?.username || !body?.password) {
            throw new BadRequestException("Username or password is empty");
        }
        const response = await this.authService.signIn(body.username, body.password);
        if (!response) {
            throw new NotFoundException("User not found");
        }
        return { sessionId: response.sessionId, role: response.role };
    }
}
