import { QueryBus, CommandBus } from '@nestjs/cqrs';
import {
  Controller,
  Get,
  Res,
  Post,
  HttpStatus,
  Query,
  Logger,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BaseResultPagination, BaseResult } from '../../domain/dtos';
import { GetNftItemsDto, MintDto, NftItemDto } from './dtos';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Mint } from './commands/mint';
import { GetNftItem } from './queries/get.nftItem';
import { GetNftItems } from './queries/get.nftitems';

@Controller('items')
@ApiTags('NftItemEndpoints')
@ApiExtraModels(BaseResultPagination, BaseResult)
export class NftItemController {
  private readonly logger = new Logger(NftItemController.name);
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get(':id')
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResult) },
        {
          properties: {
            data: { type: 'any' },
          },
        },
      ],
    },
  })
  public async GetNftItem(@Res() res, @Param('id') nftItemId: string) {
    const result = await this.queryBus.execute(new GetNftItem(nftItemId));
    return res.status(HttpStatus.OK).json(result);
  }

  @Get()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResultPagination) },
        {
          properties: {
            data: {
              properties: {
                items: {
                  type: 'array',
                  items: { $ref: getSchemaPath(NftItemDto) },
                },
              },
            },
          },
        },
      ],
    },
  })
  public async GetNftItems(@Res() res, @Query() request: GetNftItemsDto) {
    const result = await this.queryBus.execute(new GetNftItems(request));
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Post('mint')
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResult) },
        {
          properties: {
            data: { type: 'any' },
          },
        },
      ],
    },
  })
  public async CreateItem(@Res() res, @Body() body: MintDto) {
    const result = await this.commandBus.execute(new Mint(body));
    return res.status(HttpStatus.OK).json(result);
  }
}
