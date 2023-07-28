import { ApiProperty } from '@nestjs/swagger'

export enum BookType {
  MANHUA = 'manhua',
  MANHWA = 'manhwa',
  MANGA = 'manga'
}
export class CreateBookModel {
  @ApiProperty()
    title: string

  @ApiProperty()
    synopsis: string

  @ApiProperty()
    author: string

  @ApiProperty({ enum: [BookType.MANHUA, BookType.MANGA, BookType.MANHWA] })
    type: BookType

  @ApiProperty({ type: 'string', format: 'binary' })
    file: any
}
