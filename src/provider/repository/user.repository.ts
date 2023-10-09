import { Injectable } from "@nestjs/common";
import { DatabaseService } from 'src/database/database.service';

import { User } from './user.interface'

@Injectable()
export class UserRepository {
    constructor(private db: DatabaseService){}

    async checkUserByEmail(email: string): Promise<User>{
        const userExist = await this.db.user.findFirst({
            where: {
                email: email
            }
        })
        return userExist;
    }

    async createUser(userData: User): Promise<User>{
        const user = await this.db.user.create({
            data: userData,
        })
        return user;
    }

    async getUser(userId: string): Promise<User>{
        const user = await this.db.user.findFirst({
            where: {
                id: userId
            }
        })

        return user;
    }


    async setUserVerified(userId: string): Promise<User> {
        const user = await this.db.user.update({
            where: {
                id: userId,
            },
            data: {
                is_verified: true,
            }
        })

        return user;
    }
}


