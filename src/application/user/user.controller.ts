import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Next,
  Param,
  Put,
  Query,
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
import { NextFunction, Response } from 'express';
import { BaseResult } from '../../domain/dtos/base.result';
import { JwtAuthAdminGuard } from '../auth/jwt-authAdmin.guard';
import { UpdateUser } from './commands/update.user';
import { GetAllUsersDto } from './dtos/get.all.users';
import { UpdateUserDto } from './dtos/update.user.dto';
import { GetAllUsers } from './queries/get.all.users';

@UseGuards(JwtAuthAdminGuard)
@ApiBearerAuth('JWT')
@Controller('users')
@ApiTags('UserEndpoint')
@ApiExtraModels(BaseResult)
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResult) },
        {
          properties: {
            data: {
              type: 'any',
            },
          },
        },
      ],
    },
  })
  public async GetListUser(
    @Res() res: Response,
    @Query() queryInfo: GetAllUsersDto,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.queryBus.execute(new GetAllUsers(queryInfo));

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      this.logger.error(error, error.stack);
      next(error);
    }
  }

  @Put(':id')
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResult) },
        {
          properties: {
            data: {
              type: 'any',
            },
          },
        },
      ],
    },
  })
  public async AssginAdmin(
    @Res() res: Response,
    @Param('id') id: string,
    @Query() queries: UpdateUserDto,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.commandBus.execute(new UpdateUser(id, queries));

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      this.logger.error(error, error.stack);
      next(error);
    }
  }
}
