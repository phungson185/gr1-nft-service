import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  isAdmin: boolean;

  @ApiProperty({ required: false })
  deactivated: boolean;
}
