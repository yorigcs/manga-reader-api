import { IsArray, IsIn, IsNotEmpty, IsString } from 'class-validator'
import { type UserPayload } from '../../auth/auth.service'
import { BookType } from '../swagger/books.model'

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
    title: string

  @IsNotEmpty()
  @IsString()
    synopsis: string

  @IsNotEmpty()
  @IsString()
    author: string

  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @IsArray()
    tags: string[]

  @IsIn(['manga', 'manhua', 'manhwa'])
    type: BookType

  file: Express.Multer.File
  user: UserPayload
}
