import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BooksService } from './books.service'
import { BooksController } from './books.controller'
import { AuthModule } from '../auth/auth.module'
import { AwsS3FileStorageModule } from '../shared/storage/aws-s3-file-storage.module'
import { UuidModule } from '../shared/uuid/uuid.module'
import { Book } from './entities/book.entity'
import { Chapter } from '../chapters/entities/chapter.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Book, Chapter]), AuthModule, AwsS3FileStorageModule, UuidModule],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
