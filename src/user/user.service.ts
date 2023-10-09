import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/provider/repository/user.interface';

import { UserRepository } from 'src/provider/repository/user.repository';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
    ){}


    async getUser(userId: string): Promise<User> {
        const user = await this.userRepository.getUser(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}