import { Module } from '@nestjs/common'
import { ChaptersService } from './chapters.service'
import { ChaptersController } from './chapters.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Chapter } from './entities/chapter.entity'
import { Book } from '../books/entities/book.entity'
import { AuthModule } from '../auth/auth.module'
import { AwsS3FileStorageModule } from '../shared/storage/aws-s3-file-storage.module'
import { UuidModule } from '../shared/uuid/uuid.module'

@Module({
  imports: [TypeOrmModule.forFeature([Chapter, Book]), AuthModule, AwsS3FileStorageModule, UuidModule],
  controllers: [ChaptersController],
  providers: [ChaptersService]
})
export class ChaptersModule {}
