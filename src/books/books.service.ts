import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { type CreateBookDto } from './dto/create-book.dto'
import { AWS_PROVIDES } from '../constants'
import { AwsS3FileStorageService } from '../shared/storage/aws-s3-file-storage.service'
import { Book } from './entities/book.entity'

@Injectable()
export class BooksService {
  constructor (
    @Inject(AWS_PROVIDES.S3.BUCKET_MANGA_READER) private readonly s3: AwsS3FileStorageService,
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>
  ) {}

  async create (createBookDto: CreateBookDto) {
    const { file: { buffer, mimetype }, title, user } = createBookDto
    const book = await this.bookRepo.findOneBy({ title })
    if (book !== null) throw new ConflictException('This book already exists!')
    const folderName = title.split(' ').join('-')
    const extension = mimetype.split('/')[1]
    const bookImage = await this.s3.upload({ file: buffer, fileName: `${folderName}/cover.${extension}` })
    await this.bookRepo.save({
      title: createBookDto.title,
      author: createBookDto.author,
      synopsis: createBookDto.synopsis,
      type: createBookDto.type,
      image: bookImage,
      postedBy: user.username
    })
    return 'Book created with success'
  }
}
