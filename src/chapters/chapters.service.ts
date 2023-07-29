import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { type CreateChapterDto } from './dto/create-chapter.dto'
import { AwsS3FileStorageService } from '../shared/storage/aws-s3-file-storage.service'
import { AWS_PROVIDES } from '../constants'
import { UuidService } from '../shared/uuid/uuid.service'
import { PrismaService } from '../prisma.service'

@Injectable()
export class ChaptersService {
  constructor (
    @Inject(AWS_PROVIDES.S3.BUCKET_MANGA_READER) private readonly s3: AwsS3FileStorageService,
    private readonly uuidService: UuidService,
    private readonly prisma: PrismaService
  ) { }

  async create (createChapterDto: CreateChapterDto) {
    const { bookId, chapterName, chapterNum, user, files } = createChapterDto
    const hasBook = await this.prisma.book.findUnique({ where: { id: bookId } })
    if (hasBook === null) throw new NotFoundException("This book doesn't exists!")
    const hasChapter = await this.prisma.chapter.findFirst({ where: { AND: [{ bookId }, { chapterNum: parseInt(chapterNum) }] } })
    if (hasChapter !== null) throw new ConflictException('This chapter already exists for this book!')
    const pageImages: string[] = []
    for (const file of files) {
      const extension = file.mimetype.split('/')[1]
      const page = await this.s3.upload({ file: file.buffer, fileName: `${this.uuidService.generate({ key: `${chapterName}-${chapterNum}` })}.${extension}` })
      pageImages.push(page)
    }
    await this.prisma.chapter.create({
      data: {
        chapterName,
        chapterNum: parseInt(chapterNum),
        createBy: user.username,
        bookId,
        page: { create: { pageImages, createBy: user.username } }
      }
    })

    return 'Chapter created!'
  }

  findAll () {
    return 'This action returns all chapters'
  }
}
