import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { BaseQueryParams } from '../../../domain/dtos';

export class GetNftItemsDto extends BaseQueryParams {
  @ApiProperty({ required: false, nullable: true })
  owner: string;

  orderBy = 'createdAt';
}
