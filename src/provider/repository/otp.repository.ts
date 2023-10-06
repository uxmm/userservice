import { Injectable } from "@nestjs/common";
import { DatabaseService } from 'src/database/database.service';

import { Otp } from './otp.interface'

@Injectable()
export class OtpRepository {
    constructor(private db: DatabaseService){}

    async createOtp(otpData: Otp): Promise<Otp>{
        const otp = await this.db.otp.create({
            data: otpData,
        })

        return otp;
    }

    async getOtpsByUserId(userId: string): Promise<Otp[]>{
        const _currentDate = new Date();

        const otpList = await this.db.otp.findMany({
            where: {
                user_id: userId,
                is_active: true,
                expiration:{
                    gte: new Date(_currentDate.setMinutes(_currentDate.getMinutes() + 5))
                }
            },
        })

        return otpList;
    }

    async findOtpByUserId(userId: string, code: number): Promise<Otp>{        
        const otpList = await this.db.otp.findFirst({
            where: {
                user_id: userId,
                is_active: true,
                code: code,
            },
        })

        return otpList;
    }

    async setOtpInactive(otpId: string): Promise<Otp>{
        const otp = await this.db.otp.update({
            where: {
                id: otpId,
            },
            data: {
                is_active: false,
            }
        })

        return otp;
    }
}
