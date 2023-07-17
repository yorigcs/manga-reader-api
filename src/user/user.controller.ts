import { Controller, Post, Body, BadRequestException, ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEmailError } from './errors/user.email.error';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiResponse({
    status: 409,
    description: 'This e-mail is already associated with an account',
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid field validation',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const { password, confirmPassword } = createUserDto;
    if (password !== confirmPassword) {
      throw new BadRequestException('The fields password and confirm password must be equals.');
    }
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      if (error instanceof UserEmailError) throw new ConflictException(error.message);
      throw error;
    }
  }
}
