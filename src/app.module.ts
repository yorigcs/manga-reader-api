import { Module } from '@nestjs/common'
import { ThrottlerModule } from '@nestjs/throttler'
import { ConfigModule } from '@nestjs/config'
import config from './configuration/env.config'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { TagsModule } from './tags/tags.module'
import { BooksModule } from './books/books.module'
import { ChaptersModule } from './chapters/chapters.module'
import { GlobalModule } from './shared/global.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 20 }),
    UserModule,
    AuthModule,
    TagsModule,
    BooksModule,
    ChaptersModule,
    GlobalModule
  ]
})
export class AppModule {}
