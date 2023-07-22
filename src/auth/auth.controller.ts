import { Body, Controller, Post } from '@nestjs/common'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { AuthModelResponse } from './swagger/auth.model'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}
  @Post()
  @ApiCreatedResponse({ type: AuthModelResponse })
  @ApiBadRequestResponse({ description: "This email and password doesn't match" })
  async AuthWithDefault (@Body() authDto: AuthDto) {
    return await this.authService.withDefault(authDto)
  }
}
