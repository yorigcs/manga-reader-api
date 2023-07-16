import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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
  create(@Body() createUserDto: CreateUserDto) {
    const { password, confirmPassword } = createUserDto;
    if (password !== confirmPassword) {
      throw new BadRequestException(
        'The fields password and confirm password must be equals.',
      );
    }
    return this.userService.create(createUserDto);
  }
}
