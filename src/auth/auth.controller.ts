import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthModelResponse } from './swagger/auth.model';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  @ApiCreatedResponse({ type: AuthModelResponse })
  async AuthWithDefault(@Body() authDto: AuthDto) {
    return await this.authService.withDefault(authDto);
  }
}
