import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { Min, Max } from 'class-validator';

export class BaseQueryParams {
  @ApiProperty({ required: false, nullable: true })
  search: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @Min(1)
  page: number = 1;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @Min(1)
  @Max(25)
  size: number = 10;

  @ApiProperty({ required: false, nullable: true, default: 'createdAt' })
  orderBy: string;
  
  @ApiProperty({ required: false, nullable: true, default: true })
  @Transform(({ value }) => {
    return [true, 'enabled', 'true'].indexOf(value) > -1;
  })
  desc: boolean = true;

  // @Type(() => Number)
  // skipIndex = Number(this.size) * Number(this.page - 1);
}
