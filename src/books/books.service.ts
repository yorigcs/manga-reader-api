import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common'
import { type CreateBookDto } from './dto/create-book.dto'
import { AWS_PROVIDES } from '../constants'
import { AwsS3FileStorageService } from '../shared/storage/aws-s3-file-storage.service'
import { UuidService } from '../shared/uuid/uuid.service'
import { PrismaService } from '../prisma.service'

@Injectable()
export class BooksService {
  constructor (
    @Inject(AWS_PROVIDES.S3.BUCKET_MANGA_READER) private readonly s3: AwsS3FileStorageService,
    private readonly prisma: PrismaService,
    private readonly uuidService: UuidService
  ) {}

  async create (createBookDto: CreateBookDto) {
    const { file: { buffer, mimetype }, title, user, type, author, synopsis, tags } = createBookDto
    const book = await this.prisma.book.findUnique({ where: { title } })
    if (book !== null) throw new ConflictException('This book already exists!')
    const availableTags = (await this.prisma.tag.findMany()).map(tag => tag.name)
    for (const tag of tags) {
      if (!availableTags.includes(tag)) throw new BadRequestException(`[${tag}] is not a available tag. Available tags: [${availableTags.toString() as string}]`)
    }
    const extension = mimetype.split('/')[1]
    const bookImage = await this.s3.upload({ file: buffer, fileName: `${this.uuidService.generate({ key: 'cover' })}.${extension}` })
    await this.prisma.book.create({ data: { title, type, author, synopsis, tags, createBy: user.username, coverImg: bookImage } })
    return 'Book created with success'
  }

  async findAllBooksWithNChapters () {
    return this.prisma.book.findMany()
  }
}
