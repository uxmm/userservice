import { Module } from "@nestjs/common";
import { AppModule } from "src/app.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserRepository } from "../provider/repository/user.repository";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/constant/jwt.constant";
import { AuthStrategy } from "./auth.strategy";
import { OtpRepository } from "src/provider/repository/otp.repository";


@Module({
    controllers: [AuthController],
    providers: [AuthService, UserRepository, AuthStrategy, OtpRepository],
    imports: [JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '15m' },
    }),],
})
export class AuthModule
{

}
