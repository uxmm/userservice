import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('api')
export class UserController {
    @UseGuards(AuthGuard('jwt'))    
    @Get('/users')
    getUser(@Req() Req: Request) {
        console.log(Req.user);

        return {message: Req.user}
    }
}
