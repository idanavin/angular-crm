import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post()
    async login(@Body("username") username: string, @Body("password") password: string) {
        const user = await this.authService.validate(username, password);        
        return user;
    }
}
