
import { BadRequestException, HttpException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { User } from 'src/provider/repository/user.interface';
import { UserRepository } from 'src/provider/repository/user.repository';
import { JwtService } from '@nestjs/jwt'
import { JWTPayload } from 'jose';
import { OtpRepository } from 'src/provider/repository/otp.repository';

@Injectable()
export class RequestOtpPipe implements PipeTransform {
    constructor(
        private jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly otpRepository: OtpRepository,
    ) {}
    
    async transform(accessToken: string): Promise<User> {
        const decodedJwtAccessToken = this.jwtService.decode(accessToken);
        
        const user = await this.userRepository.getUser(decodedJwtAccessToken.sub);
        if(!user){
            throw new NotFoundException('User not found');
        }

        if (user.is_verified) {
            throw new BadRequestException('User already verified');
        }

        const otpList = await this.otpRepository.getOtpsByUserId(user.id);
        if (otpList.length >= 4) {
            throw new HttpException('otp request limit exceeded, please wait for 5 mins', 429);
        }

        return user;
    }
}