import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { TagsService } from './tags.service'
import { CreateTagDto } from './dto/create-tag.dto'
import { RolesGuard } from '../auth/roles.guard'
import { AuthGuard } from '../auth/auth.guard'
import { UserRole } from '../user/entities/user.entity'
import { GetAllTagsResponse } from './swagger/tags.model'

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor (private readonly tagsService: TagsService) {}

  @UseGuards(AuthGuard, RolesGuard(UserRole.ADMIN))
  @Post()
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Invalid bearer token' })
  @ApiForbiddenResponse({ description: "User doesn't have permission" })
  @ApiCreatedResponse({ description: 'Tag created!' })
  @ApiConflictResponse({ description: 'This tag already exists' })
  async create (@Body() createTagDto: CreateTagDto) {
    return await this.tagsService.create(createTagDto)
  }

  @Get()
  @ApiOkResponse({ description: 'List of all tags available.', type: GetAllTagsResponse, isArray: true })
  async findAll () {
    return await this.tagsService.findAll()
  }
}
