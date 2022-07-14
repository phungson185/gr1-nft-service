import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BasicUser } from 'src/domain/schemas/basicUser';
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
  creator: string;

  @AutoMap()
  @ApiProperty()
  owner: BasicUser;

  @AutoMap()
  @ApiProperty()
  image: string;  

  @AutoMap()
  @ApiProperty()
  transactionHash: string;
}
