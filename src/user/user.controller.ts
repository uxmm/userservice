import { Controller, Get, Res, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from 'src/provider/repository/user.interface';
import { UserTransformerPipe } from 'src/validator/user-transformer.pipe';
import { UserService } from './user.service';

@Controller('api')
export class UserController {
    constructor(private userService: UserService
    ){}

    @UseGuards(AuthGuard('jwt'))
    @Get('/users/:userId')
    getUser(@Param('userId', UserTransformerPipe) user:User, @Res() res: Response) {
        const {id, email, username, address } = user
        return res.json({id, username, email, address });
    }

    async deleteUser(@Param('userId', UserTransformerPipe) user:User, @Res() res: Response) {
        try {
            await this.userService.deleteUser(user.id);
            return res.json({message: 'User deleted successfully'});
        } catch (err) {
            throw err;
        }

    }
}
