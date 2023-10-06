import { HttpException, Injectable, UnauthorizedException, ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SignUpDto, LoginDto, verifyOtpDto } from './dtos';
import { User } from  '../provider/repository/user.interface'
import { UserRepository } from 'src/provider/repository/user.repository';

import { JwtService } from '@nestjs/jwt';
import { OtpRepository } from 'src/provider/repository/otp.repository';
import { Otp } from 'src/provider/repository/otp.interface';

@Injectable()
export class AuthService{
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private otpRepository: OtpRepository
    ){}
    
    // User Signup to create a new user.
    async signup(req: SignUpDto): Promise<User> {
        const userExist = await this.userRepository.checkUserByEmail(req.email);
        if(userExist){
            throw new HttpException('User already exist', 400);
        }

        const hash = await bcrypt.hash(req.password, 10);
        const userData: User = {
            username: req.username,
            email: req.email,
            password: hash,
            address: req.address,
            phone: req.phone,
        }

        const user = await this.userRepository.createUser(userData);
        return user;
    }

    async login(req: LoginDto): Promise<{ token: string | null }>{
        const error = {error: 'Invalid email or password'}

        const _user = await this.userRepository.checkUserByEmail(req.email);
        if(!_user){
            throw new ForbiddenException();
        }

        // validate password
        const comparePwd = await bcrypt.compare(req.password, _user?.password);
        if (!comparePwd) {
            throw new UnauthorizedException(error);
        }

        //get jwt token
        const payload = { sub: _user.id, username: _user.username };
        return {
            token: await this.jwtService.signAsync(payload),
        };
    }

    async requestOtp(email: string): Promise<{ otp: number | null }>{
        const user = await this.userRepository.checkUserByEmail(email);
        if(!user){
            throw new NotFoundException('Unable to find user with this email');
        }

        const current = new Date();
        const otpExpiredDate = new Date(current.setMinutes(current.getMinutes() + 15));

        const otpData: Otp = {
            code : Math.floor(1000 + Math.random() * 9000),
            is_active: true,
            expiration: otpExpiredDate,
            user_id: user.id,
        }

        const _otp = await this.otpRepository.createOtp(otpData)

        return { otp: _otp.code}
    }

    async verifyOtp({otp_code, email}: verifyOtpDto): Promise<{isVerified: boolean}>{
        const user = await this.userRepository.checkUserByEmail(email);
        if(!user){
            throw new NotFoundException('Unable to find user with this email');
        }

        const otpData = await this.otpRepository.findOtpByUserId(user.id, otp_code);
        if (!otpData) {
            throw new NotFoundException('invalid otp code');
        }

        const current = new Date();
        if(current > otpData.expiration){
            throw new BadRequestException('otp expired');
        }

        const setInactive = await this.otpRepository.setOtpInactive(otpData.id);
        if(!setInactive){
            throw new BadRequestException('unable to verify otp');
        }

        const setUserActive = await this.userRepository.setUserVerified(user.id);
        if(!setUserActive){
            throw new BadRequestException('unable to verify otp');
        }


        return {isVerified: true}
    }
}