import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  BaseQueryParams,
  BaseResult,
  BaseResultPagination,
} from '../../domain/dtos';
import { CreateComment } from './commands/create.comment';
import { EditComment } from './commands/edit.comment';
import { CreateCommentDto } from './dtos';
import { EditCommentDto } from './dtos/edit.comment.dto';
import { GetComments } from './queries/get.comments';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comment')
@ApiTags('CommentEndpoints')
@ApiExtraModels(BaseResultPagination, BaseResult)
export class NftItemController {
  private readonly logger = new Logger(NftItemController.name);
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('/item/:itemId')
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
  public async GetComment(
    @Res() res,
    @Param('itemId') itemId: string,
    @Query() query: BaseQueryParams,
  ) {
    const result = await this.queryBus.execute(
      new GetComments(itemId, query),
    );
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Post('/item/:itemId')
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
  public async CreateComment(
    @Res() res,
    @Param('itemId') itemId: string,
    @Body() body: CreateCommentDto,
    @Request() req: any,
  ) {
    const result = await this.commandBus.execute(
      new CreateComment(itemId, req?.user?._id, body),
    );
    return res.status(HttpStatus.OK).json(result);
  }

  @Put(':id')
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
  public async EditComment(
    @Res() res,
    @Param('id') id: string,
    @Body() body: EditCommentDto,
  ) {
    const result = await this.commandBus.execute(new EditComment(id, body));
    return res.status(HttpStatus.OK).json(result);
  }
}
