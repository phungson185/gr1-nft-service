import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @AutoMap()
  @ApiProperty()
  avatar: string;

  @AutoMap()
  @ApiProperty({required: true})
  username: string;

  @AutoMap()
  @ApiProperty({required: true})
  content: string;
}
