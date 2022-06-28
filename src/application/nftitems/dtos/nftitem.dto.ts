import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDocumentDto } from '../../../domain/dtos';

export class NftItemDto extends BaseDocumentDto {
  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty()
  description: string;

  @AutoMap()
  @ApiProperty()
  tokenId: string;

  @AutoMap()
  @ApiProperty()
  nftContract: string;

  @AutoMap()
  @ApiProperty()
  creatorAddress: string;

  @AutoMap()
  @ApiProperty()
  image: string;  

  @AutoMap()
  @ApiProperty()
  transactionHash: string;
}
