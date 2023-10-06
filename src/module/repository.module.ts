import { UserRepository } from "src/provider/repository/user.repository";
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    controllers: [],
    providers: [
        UserRepository
    ],
    exports: [
        UserRepository,
    ],
})

export class RepositoryModule {}
  