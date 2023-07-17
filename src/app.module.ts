import { Module } from '@nestjs/common';

import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import config from './configuration/env.config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [config] }), ThrottlerModule.forRoot({ ttl: 60, limit: 20 }), UserModule],
})
export class AppModule {}
