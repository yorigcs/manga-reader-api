import { ApiProperty } from '@nestjs/swagger';

export class GetAllTagsResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
