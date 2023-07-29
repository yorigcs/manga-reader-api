import { IsArray, IsIn, IsString } from 'class-validator'
import { type UserPayload } from '../../auth/auth.service'
import { BookType } from '../swagger/books.model'

export class CreateBookDto {
  @IsString()
    title: string

  @IsString()
    synopsis: string

  @IsString()
    author: string

  @IsString({ each: true })
  @IsArray()
    tags: string[]

  @IsIn(['manga', 'manhua', 'manhwa'])
    type: BookType

  file: Express.Multer.File
  user: UserPayload
}
