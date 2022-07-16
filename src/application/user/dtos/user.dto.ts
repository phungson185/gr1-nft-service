import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ required: true })
  nonce: number;

  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: true })
  address: string;

  @ApiProperty({ required: true })
  createdAt: number;

  @ApiProperty({ required: true })
  updateAt: number;
}
