import { Controller, Post, Body, UseGuards, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../user/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserReq } from '../auth/user.decorator';
import { UserPayload } from '../auth/auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateBookModel } from './swagger/books.model';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(AuthGuard, RolesGuard(UserRole.ADMIN))
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'List of cats', type: CreateBookModel })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Invalid bearer token' })
  @ApiForbiddenResponse({ description: "User doesn't have permission" })
  @ApiConflictResponse({ description: 'This book already exists' })
  @ApiCreatedResponse({ description: 'Book created!' })
  create(
    @Body() createBookDto: CreateBookDto,
    @UserReq() user: UserPayload,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 10e6 }), new FileTypeValidator({ fileType: 'image/png' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    createBookDto.user = user;
    createBookDto.file = file;
    return this.booksService.create(createBookDto);
  }
}
