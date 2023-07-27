import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UploadedFiles
} from '@nestjs/common'
import { ChaptersService } from './chapters.service'
import { CreateChapterDto } from './dto/create-chapter.dto'
import { AuthGuard } from '../auth/auth.guard'
import { RolesGuard } from '../auth/roles.guard'
import { UserRole } from '../user/entities/user.entity'
import { FilesInterceptor } from '@nestjs/platform-express'
import { UserReq } from '../auth/user.decorator'
import { UserPayload } from '../auth/auth.service'
import { ParseFilesPipe } from '../shared/ParseFiesPipe'

@Controller('chapters')
export class ChaptersController {
  constructor (private readonly chaptersService: ChaptersService) {}

  @UseGuards(AuthGuard, RolesGuard(UserRole.ADMIN))
  @UseInterceptors(FilesInterceptor('files'))
  @Post()
  async create (@Body() createChapterDto: CreateChapterDto, @UserReq() user: UserPayload, @UploadedFiles(
    new ParseFilesPipe(new ParseFilePipe({
      fileIsRequired: true,
      validators: [new MaxFileSizeValidator({ maxSize: 10 * 10e6 }), new FileTypeValidator({ fileType: 'image/png' })]
    }))
  ) files: Express.Multer.File[]) {
    createChapterDto.user = user
    createChapterDto.files = files
    return this.chaptersService.create(createChapterDto)
  }

  @Get()
  findAll () {
    return this.chaptersService.findAll()
  }
}
