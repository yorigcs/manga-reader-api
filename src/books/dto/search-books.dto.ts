import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class SearchBooksDto {
  @IsOptional()
  @Min(1)
  @Type(() => Number)
    page?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
    booksPerPage?: number

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
    allowedTags?: string[]

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
    bannedTags?: string[]

  @IsOptional()
  @IsInt()
  @Type(() => Number)
    withLastChapters?: number
}
