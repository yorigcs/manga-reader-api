import { Module } from '@nestjs/common'
import { ThrottlerModule } from '@nestjs/throttler'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import config from './configuration/env.config'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { TagsModule } from './tags/tags.module'
import { BooksModule } from './books/books.module'
import { ChaptersModule } from './chapters/chapters.module'
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 20 }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...config().database,
      autoLoadEntities: true,
      synchronize: true
    }),
    UserModule,
    AuthModule,
    TagsModule,
    BooksModule,
    ChaptersModule
  ]
})
export class AppModule {}
