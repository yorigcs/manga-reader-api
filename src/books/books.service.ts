import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { type CreateBookDto } from './dto/create-book.dto'
import { AWS_PROVIDES } from '../constants'
import { AwsS3FileStorageService } from '../shared/storage/aws-s3-file-storage.service'
import { Book } from './entities/book.entity'
import { UuidService } from '../shared/uuid/uuid.service'

@Injectable()
export class BooksService {
  constructor (
    @Inject(AWS_PROVIDES.S3.BUCKET_MANGA_READER) private readonly s3: AwsS3FileStorageService,
    private readonly uuidService: UuidService,
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>
  ) {}

  async create (createBookDto: CreateBookDto) {
    const { file: { buffer, mimetype }, title, user } = createBookDto
    const book = await this.bookRepo.findOneBy({ title })
    if (book !== null) throw new ConflictException('This book already exists!')
    const extension = mimetype.split('/')[1]
    const bookImage = await this.s3.upload({ file: buffer, fileName: `${this.uuidService.generate({ key: 'cover' })}.${extension}` })
    const newBook = new Book()
    newBook.title = createBookDto.title
    newBook.author = createBookDto.author
    newBook.synopsis = createBookDto.synopsis
    newBook.type = createBookDto.type
    newBook.image = bookImage
    newBook.postedBy = user.username
    await this.bookRepo.save(newBook)
    return 'Book created with success'
  }
}
