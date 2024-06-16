import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.userService.register(registerDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() loginDto: LoginDto) {
        return this.userService.login(loginDto);
    }

    @Get('find')
    find(@Query('q') q: string) {
        return this.userService.find(q);
    }
}