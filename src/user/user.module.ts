import { Module } from '@nestjs/common';
import { HashModule } from '../shared/hash/hash.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HashModule],
  exports: [TypeOrmModule, HashModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
