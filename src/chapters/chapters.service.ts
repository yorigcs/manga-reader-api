import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { type CreateChapterDto } from './dto/create-chapter.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Chapter } from './entities/chapter.entity'
import { Repository } from 'typeorm'
import { Book } from '../books/entities/book.entity'
import { AwsS3FileStorageService } from '../shared/storage/aws-s3-file-storage.service'
import { AWS_PROVIDES } from '../constants'
import { UuidService } from '../shared/uuid/uuid.service'

@Injectable()
export class ChaptersService {
  constructor (
    @Inject(AWS_PROVIDES.S3.BUCKET_MANGA_READER) private readonly s3: AwsS3FileStorageService,
    private readonly uuidService: UuidService,
    @InjectRepository(Chapter) private readonly chapterRepo: Repository<Chapter>,
    @InjectRepository(Book) private readonly bookRepo: Repository<Chapter>) {
  }

  async create (createChapterDto: CreateChapterDto) {
    const { bookId, chapterName, chapterNum, user, files } = createChapterDto
    const hasBook = await this.bookRepo.findOne({ where: { id: parseInt(bookId) } })
    if (hasBook === null) throw new NotFoundException("This book doesn't exists!")
    const hasChapter = await this.chapterRepo.findOne({ where: { bookId: parseInt(bookId), chapterNum: parseInt(chapterNum) } })
    if (hasChapter !== null) throw new NotFoundException('This chapter already exists for this book!')
    const pagesImage: string[] = []
    for (const file of files) {
      const extension = file.mimetype.split('/')[1]
      const page = await this.s3.upload({ file: file.buffer, fileName: `${this.uuidService.generate({ key: `${chapterName}-${chapterNum}-` })}.${extension}` })
      pagesImage.push(page)
    }
    const newChapter = new Chapter()
    newChapter.bookId = parseInt(bookId)
    newChapter.chapterName = chapterName
    newChapter.chapterNum = parseInt(chapterNum)
    newChapter.postedBy = user.username
    newChapter.pagesImage = pagesImage

    await this.chapterRepo.save(newChapter)
    return 'Chapter created!'
  }

  findAll () {
    return 'This action returns all chapters'
  }
}
