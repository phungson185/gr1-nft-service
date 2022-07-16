import { ApiProperty } from '@nestjs/swagger';

export class GetAllUsersDto {
  @ApiProperty({ required: false, default: null })
  address: string;

  @ApiProperty({ required: false, default: 1 })
  page: number;

  @ApiProperty({ required: false, default: 15 })
  size: number;
}
