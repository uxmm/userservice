import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from 'src/provider/repository/user.repository';
import { RepositoryModule } from 'src/module/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [UserController]
})
export class UserModule {}
