import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Decimal128 } from 'mongoose';
import { BasicUser } from 'src/domain/schemas/basicuser';
import { BaseDocumentDto } from '../../../domain/dtos';

export class MintDto extends BaseDocumentDto {
  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty()
  image: string;

  @AutoMap()
  @ApiProperty()
  tokenId: string;

  @AutoMap()
  @ApiProperty()
  nftContract: string;

  @AutoMap()
  @ApiProperty()
  description: string;

  @AutoMap()
  @ApiProperty()
  transactionHash: string;

  @AutoMap()
  @ApiProperty()
  creator: BasicUser;

  @AutoMap()
  @ApiProperty()
  owner: BasicUser;
}
