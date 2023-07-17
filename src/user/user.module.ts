import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database.modules';
import { HashModule } from '../shared/hash/hash.module';

@Module({
  imports: [DatabaseModule, HashModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
})
export class UserModule {}
