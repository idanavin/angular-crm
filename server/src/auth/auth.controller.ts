import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    //If username and password are correct by guard, return access token
    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Request() req) {
        const accessToken = this.authService.login(req.user);
        return accessToken;
    }

    //Protected route return true if auth is correct
    @UseGuards(JwtAuthGuard)
    @Get()
    async isAuthed() {
        return true
    }
}
