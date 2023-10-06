import { Controller, Get, Res, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from 'src/provider/repository/user.interface';
import { UserTransformerPipe } from 'src/validator/user-transformer.pipe';

@Controller('api')
export class UserController {
    @UseGuards(AuthGuard('jwt'))
    @Get('/users/:userId')
    getUser(@Param('userId', UserTransformerPipe) user:User, @Res() res: Response) {
        const {id, email, username, address } = user
        return res.json({id, username, email, address });
    }
}
