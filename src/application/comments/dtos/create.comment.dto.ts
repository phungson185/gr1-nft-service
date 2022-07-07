import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDocumentDto } from '../../../domain/dtos';

export class CreateCommentDto {
  @AutoMap()
  @ApiProperty({required: true})
  itemId: string;

  @AutoMap()
  @ApiProperty({required: true})
  userAddress: string;

  @AutoMap()
  @ApiProperty({required: true})
  content: string;
}
