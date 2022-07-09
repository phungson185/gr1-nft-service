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
import { CreateCommentDto } from './dtos';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateComment } from './commands/create.comment';

@Controller('comment')
@ApiTags('CommentEndpoints')
@ApiExtraModels(BaseResultPagination, BaseResult)
export class NftItemController {
  private readonly logger = new Logger(NftItemController.name);
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @Post('')
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
  public async CreateComment(@Res() res, @Body() body: CreateCommentDto) {
    const result = await this.commandBus.execute(new CreateComment(body));
    return res.status(HttpStatus.OK).json(result);
  }
}
