import { IsNotEmpty, IsNumberString } from 'class-validator'
import { type UserPayload } from '../../auth/auth.service'

export class CreateChapterDto {
  @IsNumberString()
    chapterNum: string

  @IsNumberString()
    bookId: string

  @IsNotEmpty()
    chapterName: string

  files: Express.Multer.File[]
  user: UserPayload
}
