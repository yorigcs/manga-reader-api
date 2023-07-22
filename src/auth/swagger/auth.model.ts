import { ApiProperty } from '@nestjs/swagger'
import { UserModelResponse } from '../../user/swagger/user.model'

export class AuthModelResponse {
  @ApiProperty({ type: UserModelResponse })
    user: any

  @ApiProperty()
    accessToken: string
}
