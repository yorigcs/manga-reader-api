import { IsNotEmpty, IsNumberString, IsString } from 'class-validator'
import { type UserPayload } from '../../auth/auth.service'

export class CreateChapterDto {
  @IsNumberString()
    chapterNum: string

  @IsString()
    bookId: string

  @IsString()
  @IsNotEmpty()
    chapterName: string

  files: Express.Multer.File[]
  user: UserPayload
}
