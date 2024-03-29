import { QueryBus, CommandBus } from '@nestjs/cqrs';
import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiExtraModels,
  ApiOkResponse,
  ApiCreatedResponse,
  getSchemaPath,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SystemConfigDto } from './dtos';
import { BaseResult } from '../../domain/dtos';
import { GetSystemConfig } from './queries/get.systemconfig';
import { CreateSystemConfig } from './commands/create.systemconfig';
import { UpdateSystemConfig } from './commands/update.systemconfig';
import { DeleteSystemConfig } from './commands/delete.systemconfig';
import { JwtAuthAdminGuard } from '../auth/jwt-authAdmin.guard';

@Controller('system')
@ApiTags('SystemEndpoints')
@ApiExtraModels(BaseResult, SystemConfigDto)
export class SystemController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(JwtAuthAdminGuard)
  @ApiBearerAuth('JWT')
  @Post()
  @ApiCreatedResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResult) },
        {
          properties: {
            data: { type: 'string' },
          },
        },
      ],
    },
  })
  public async CreateSystemConfig(
    @Res() res,
    @Query() CreateDto: SystemConfigDto,
  ) {
    const result = await this.commandBus.execute(
      new CreateSystemConfig(CreateDto),
    );
    return res.status(HttpStatus.OK).json(result);
  }

  @Get()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResult) },
        {
          properties: {
            data: { $ref: getSchemaPath(SystemConfigDto) },
          },
        },
      ],
    },
  })
  public async GetSystemConfig(@Res() res) {
    const result = await this.queryBus.execute(new GetSystemConfig());
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(JwtAuthAdminGuard)
  @ApiBearerAuth('JWT')
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
  public async UpdateSystemConfig(
    @Res() res,
    @Param('id') systemConfigId: string,
    @Query() updateDto: SystemConfigDto,
  ) {
    const result = await this.commandBus.execute(
      new UpdateSystemConfig(systemConfigId, updateDto),
    );
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(JwtAuthAdminGuard)
  @ApiBearerAuth('JWT')
  @Delete(':id')
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResult) },
        {
          properties: {
            data: { type: 'boolean' },
          },
        },
      ],
    },
  })
  public async DeleteSystemConfig(
    @Res() res,
    @Param('id') systemConfigId: string,
  ) {
    const result = await this.commandBus.execute(
      new DeleteSystemConfig(systemConfigId),
    );
    return res.status(HttpStatus.OK).json(result);
  }
}
