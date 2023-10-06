import { Controller, Post, Body, Res, Get, Query, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from "./auth.service";
import { SignUpDto, LoginDto, GetOtpDto, verifyOtpDto } from "./dtos";
import { User } from "src/provider/repository/user.interface";
import { RequestOtpPipe } from "src/validator/requestOtp-transformer.pipe";

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

    @Get('/otp/request')
    async requestOtp(@Query('accessToken', RequestOtpPipe) user:User, @Res() res: Response){
        try {
            const otp = await this.authService.requestOtp(user?.email);
            return res.status(200).json(otp)
        } catch (err) {
            throw err;
        }
    }

    @Post('/otp/verify')
    async verifyOtp(@Body() verifyOtpDto: verifyOtpDto, @Res() res: Response){
        try {
            const resp = await this.authService.verifyOtp(verifyOtpDto);
            return res.status(200).json(resp)
        } catch (err) {
            throw err;
        }
    }
}