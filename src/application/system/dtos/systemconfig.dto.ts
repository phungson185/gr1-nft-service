import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class SystemConfigDto {
  @AutoMap()
  @ApiProperty()
  nftContractAddress: string;
}