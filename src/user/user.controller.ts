import { Controller, Post, Body, BadRequestException } from '@nestjs/common'
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UserModelResponse } from './swagger/user.model'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor (private readonly userService: UserService) {}

  @Post('create')
  @ApiCreatedResponse({ description: 'A new user was created with success', type: UserModelResponse })
  @ApiConflictResponse({ description: 'This e-mail is already associated with an account' })
  @ApiBadRequestResponse({ description: 'A field property is invalid.' })
  async create (@Body() createUserDto: CreateUserDto) {
    const { password, confirmPassword } = createUserDto
    if (password !== confirmPassword) {
      throw new BadRequestException('The fields password and confirm password must be equals.')
    }
    return await this.userService.create(createUserDto)
  }
}
