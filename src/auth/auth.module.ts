import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import config from '../configuration/env.config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        global: true,
        secret: config().jwt.secret,
        signOptions: { expiresIn: '8h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
