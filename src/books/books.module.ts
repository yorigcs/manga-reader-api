import { Module } from '@nestjs/common'
import { BooksService } from './books.service'
import { BooksController } from './books.controller'
import { AuthModule } from '../auth/auth.module'
import { AwsS3FileStorageModule } from '../shared/storage/aws-s3-file-storage.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Book } from './entities/book.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Book]), AuthModule, AwsS3FileStorageModule],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
