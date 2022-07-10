import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class EditCommentDto {
  @AutoMap()
  @ApiProperty({required: true})
  content: string;
}
