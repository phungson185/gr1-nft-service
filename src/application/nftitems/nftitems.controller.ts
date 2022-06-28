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

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('JWT')
  // @Get('inventory')
  // @ApiOkResponse({
  //   schema: {
  //     allOf: [
  //       { $ref: getSchemaPath(BaseResultPagination) },
  //       {
  //         properties: {
  //           data: {
  //             properties: {
  //               items: {
  //                 type: 'array',
  //                 items: { $ref: getSchemaPath(NftItemDto) },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     ],
  //   },
  // })
  // public async GetNftItemsByAccessToken(
  //   @Res() res,
  //   @Req() req,
  //   @Query() request: GetNftItemsDto,
  // ) {
  //   request.owner = req.user.address;
  //   const result = await this.queryBus.execute(new GetNftItems(request));
  //   return res.status(HttpStatus.OK).json(result);
  // }

  // @Get('external/:tokenId')
  // @ApiOkResponse({
  //   schema: {
  //     allOf: [
  //       { $ref: getSchemaPath(BaseResult) },
  //       {
  //         properties: {
  //           data: { $ref: getSchemaPath(ItemDto) },
  //         },
  //       },
  //     ],
  //   },
  // })
  // public async GetExternalItem(@Res() res, @Param('tokenId') tokenId: string) {
  //   const result = await this.queryBus.execute(new GetExternalItem(tokenId))
  //   return res.status(HttpStatus.OK).json(result);
  // }

  // @Get('metadata/:tokenId')
  // @ApiOkResponse({
  //   schema: {
  //     allOf: [
  //       { $ref: getSchemaPath(BaseResult) },
  //       {
  //         properties: {
  //           data: { $ref: getSchemaPath(MetaDataDto) },
  //         },
  //       },
  //     ],
  //   },
  // })
  // public async GetMetaDataItem(@Res() res, @Param('tokenId') tokenId: string) {
  //   const result = await this.queryBus.execute(new GetMetaDataItem(tokenId));
  //   return res.status(HttpStatus.OK).json(result);
  // }
  // @Get(':id/transaction-fee')
  // @ApiOkResponse({
  //   schema: {
  //     allOf: [
  //       { $ref: getSchemaPath(BaseResult) },
  //       {
  //         properties: {
  //           data: { $ref: getSchemaPath(TransactionFeeDto) },
  //         },
  //       },
  //     ],
  //   },
  // })
  // public async GetNftItemTransactionFee(
  //   @Res() res,
  //   @Param('id') nftItemId: string,
  // ) {
  //   const result = await this.queryBus.execute(
  //     new GetTransactionFee(nftItemId),
  //   );
  //   return res.status(HttpStatus.OK).json(result);
  // }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('JWT')
  // @Post(':id/evolveProgress')
  // @ApiOkResponse({
  //   schema: {
  //     allOf: [
  //       { $ref: getSchemaPath(BaseResult) },
  //       {
  //         properties: {
  //           data: { properties: { percentSuccess: { type: 'number' } } },
  //         },
  //       },
  //     ],
  //   },
  // })
  // public async evolveProgress(
  //   @Req() req,
  //   @Res() res,
  //   @Param('id') id: string,
  //   @Body() evolveToken: EvolveTokenDto,
  // ) {
  //   const { address } = req.user;

  //   evolveToken.nftItemId = id;
  //   const request = new EvolveToken(evolveToken);
  //   const result = await this.queryBus.execute(request);
  //   return res.status(HttpStatus.OK).json(result);
  // }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('JWT')
  // @Post(':id/evolveHashMessage')
  // @ApiOkResponse({
  //   schema: {
  //     allOf: [
  //       { $ref: getSchemaPath(BaseResult) },
  //       {
  //         properties: {
  //           data: { type: 'object' },
  //         },
  //       },
  //     ],
  //   },
  // })
  // public async evolveHashMessage(
  //   @Req() req: any,
  //   @Res() res,
  //   @Next() next: any,
  //   @Param('id') id: string,
  // ) {
  //   try {
  //     const { address } = req.user;
  //     const result = await this.queryBus.execute(
  //       new EvolveHashMessage(address, id),
  //     );
  //     return res.status(HttpStatus.OK).json(result);
  //   } catch (error) {
  //     this.logger.error(
  //       `error on evolve hash message: ${error.message}`,
  //       error.stack,
  //     );
  //     next(error);
  //   }
  // }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('JWT')
  // @Get(':id/hash-message')
  // @ApiOkResponse({
  //   schema: {
  //     allOf: [
  //       { $ref: getSchemaPath(BaseResult) },
  //       {
  //         properties: {
  //           data: { type: 'string' },
  //         },
  //       },
  //     ],
  //   },
  // })
  // public async GetNftItemHashMessage(
  //   @Res() res,
  //   @Req() req,
  //   @Param('id') nftItemId: string,
  //   @Query() reqDto: GetNftItemHashMessageDto,
  // ) {
  //   const { address } = req.user;
  //   const request = new GetHashMessageDto();
  //   request.nftItemId = nftItemId;
  //   request.paymentTokenId = reqDto.paymentTokenId;
  //   request.price = reqDto.price;

  //   const result = await this.queryBus.execute(
  //     new GetHashMessage(address, request),
  //   );
  //   return res.status(HttpStatus.OK).json(result);
  // }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('JWT')
  // @Get(':id/signed-signature')
  // @ApiOkResponse({
  //   schema: {
  //     allOf: [
  //       { $ref: getSchemaPath(BaseResult) },
  //       {
  //         properties: {
  //           data: { type: 'string' },
  //         },
  //       },
  //     ],
  //   },
  // })
  // public async GetNftItemSignedSignature(
  //   @Res() res,
  //   @Req() req,
  //   @Param('id') id: string,
  // ) {
  //   const result = await this.queryBus.execute(new GetSignedSignature(id));
  //   return res.status(HttpStatus.OK).json(result);
  // }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('JWT')
  // @Post(':id/bids')
  // @ApiOkResponse({
  //   schema: {
  //     allOf: [
  //       { $ref: getSchemaPath(BaseResult) },
  //       {
  //         properties: {
  //           data: { type: 'string' },
  //         },
  //       },
  //     ],
  //   },
  // })
  // public async CreateNftItemBid(
  //   @Res() res,
  //   @Req() req,
  //   @Param('id') id: string,
  //   @Body() body: CreateBidDto,
  // ) {
  //   const { address } = req.user;
  //   body.nftItemId = id;
  //   const result = await this.commandBus.execute(new CreateBid(address, body));
  //   return res.status(HttpStatus.OK).json(result);
  // }

  // @Post('update/:tokenId')
  // @ApiOkResponse({
  //   schema: {
  //     allOf: [
  //       { $ref: getSchemaPath(BaseResult) },
  //       {
  //         properties: {
  //           data: { type: 'string' },
  //         },
  //       },
  //     ],
  //   },
  // })
  // public async UpdateItem(@Res() res, @Param('tokenId') tokenId: string) {
  //   const result = await this.commandBus.execute(new UpdateFilterItem(tokenId));
  //   return res.status(HttpStatus.OK).json(result);
  // }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('JWT')
  // @Post(':tokenId/update-evolve')
  // @ApiOkResponse({
  //   schema: {
  //     allOf: [
  //       { $ref: getSchemaPath(BaseResult) },
  //       {
  //         properties: {
  //           data: { type: 'string' },
  //         },
  //       },
  //     ],
  //   },
  // })
  // public async UpdateEvolveHashMessage(
  //   @Res() res,
  //   @Param('tokenId') tokenId: string,
  //   @Body() body: UpdateEvolveHashMessageDto,
  // ) {
  //   body.upgradeTokenId = tokenId;
  //   const result = await this.commandBus.execute(
  //     new UpdateEvolveHashMessage(body),
  //   );
  //   return res.status(HttpStatus.OK).json(result);
  // }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('JWT')
  // @Post('data-sync')
  // @ApiOkResponse({
  //   schema: {
  //     allOf: [
  //       { $ref: getSchemaPath(BaseResult) },
  //       {
  //         properties: {
  //           data: { type: 'string' },
  //         },
  //       },
  //     ],
  //   },
  // })
  // public async SyncNftItems(@Res() res, @Req() req) {
  //   const { address } = req.user;
  //   const result = await this.commandBus.execute(new SyncTokens(address, 100));
  //   return res.status(HttpStatus.OK).json(result);
  // }

  // @Post(':id/data-sync')
  // @ApiOkResponse({
  //   schema: {
  //     allOf: [
  //       { $ref: getSchemaPath(BaseResult) },
  //       {
  //         properties: {
  //           data: { type: 'string' },
  //         },
  //       },
  //     ],
  //   },
  // })
  // public async SyncToken(@Res() res, @Param('id') id: string) {
  //   const result = await this.commandBus.execute(new SyncToken(id));
  //   return res.status(HttpStatus.OK).json(result);
  // }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('JWT')
  // @Post('bids')
  // @ApiOkResponse({
  //   schema: {
  //     allOf: [
  //       { $ref: getSchemaPath(BaseResult) },
  //       {
  //         properties: {
  //           data: { type: 'string' },
  //         },
  //       },
  //     ],
  //   },
  // })
  // public async CreateNftItemBid(
  //   @Res() res,
  //   @Req() req,
  //   @Query() request: CreateBidDto,
  // ) {
  //   const currentUser = this.reqContext.getSubJwt(req);
  //   const result = await this.commandBus.execute(
  //     new CreateBid(currentUser, request),
  //   );
  //   return res.status(HttpStatus.OK).json(result);
  // }
}
