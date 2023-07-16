import { Module } from '@nestjs/common';

import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './user/user.module';

@Module({
  imports: [ThrottlerModule.forRoot({ ttl: 60, limit: 20 }), UserModule],
})
export class AppModule {}
