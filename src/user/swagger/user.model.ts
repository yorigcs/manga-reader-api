import { ApiProperty } from '@nestjs/swagger'

export class UserModelResponse {
  @ApiProperty()
    id: number

  @ApiProperty()
    username: string

  @ApiProperty()
    email: string

  @ApiProperty()
    role: string
}
