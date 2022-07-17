import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @Optional()
  isAdmin: boolean;

  @ApiProperty({ required: false })
  @Optional()
  deactivated: boolean;
}
