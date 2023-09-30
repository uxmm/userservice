import { Controller, Post, Body, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { SignUpDto, LoginDto } from "./dtos";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('signup')
    async signup(@Body() signUpDto: SignUpDto, @Res() res: Response){
        try {
            const user = await this.authService.signup(signUpDto);
            return res.json({
                user: user.id,
            });
        } catch (err) {
            throw err;
        }
    }

    @Post('login')
    async signin(@Body() loginDto: LoginDto, @Res() res: Response){
        try {
            const token = await this.authService.login(loginDto);
            return res.status(200).json(token)
        } catch (err) {
            throw err;
        }
    }
}