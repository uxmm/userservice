import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class SignUpDto {
    @IsNotEmpty()
    @MaxLength(50)
    username: string

    @IsEmail()
    email: string
    
    @IsNotEmpty()
    @MinLength(6)
    password: string

    @MaxLength(100)
    address: string

    @MaxLength(12)
    phone: string
}

export class LoginDto {
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}


export class GetOtpDto {
    @IsEmail()
    email: string
}

export class verifyOtpDto {
    @IsNotEmpty()
    otp_code: number

    @IsNotEmpty()
    email: string
}