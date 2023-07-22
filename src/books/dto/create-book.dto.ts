import { IsIn, IsNotEmpty } from 'class-validator'
import { type UserPayload } from '../../auth/auth.service'
import { BookType } from '../entities/book.entity'
export class CreateBookDto {
  @IsNotEmpty()
    title: string

  @IsNotEmpty()
    synopsis: string

  @IsNotEmpty()
    author: string

  @IsIn(['manga', 'manhua', 'manhwa'])
    type: BookType

  file: Express.Multer.File
  user: UserPayload
}
