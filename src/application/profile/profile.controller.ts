import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Response,
  HttpStatus,
  Param,
  Put,
  UseInterceptors,
  UploadedFiles,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiExtraModels,
  ApiOkResponse,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
  getSchemaPath,
} from '@nestjs/swagger';
import { BaseResult } from '../../domain/dtos';
import { User } from '../../domain/schemas/user.schema';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './dto';

@Controller('profile')
@ApiTags('Profile')
@ApiExtraModels(User, BaseResult)
export class ProfileController {
  constructor(
    // private readonly transferService: TransferService,
    // private readonly configService: ConfigService,
    private readonly profileService: ProfileService,
  ) {}

  @Get(':address')
  @ApiOkResponse({
    schema: {
      allOf: [
        {
          properties: {
            success: { type: 'boolean' },
            data: { $ref: getSchemaPath(User) },
            errors: { type: 'object' },
          },
        },
      ],
    },
  })
  async getProfileByAddress(@Param('address') address: string) {
    const user = await this.profileService.getProfileByAddress(address);
    return { success: true, errors: [], data: user.toJSON() };
  }

  @Put()
  @ApiOkResponse({
    schema: {
      allOf: [
        {
          properties: {
            success: { type: 'boolean' },
            data: { $ref: getSchemaPath(User) },
            errors: { type: 'object' },
          },
        },
      ],
    },
  })
  async updateProfileByAddress(@Body() updateInfo: UpdateUserDto) {
    const user = await this.profileService.updateProfileByAddress(updateInfo);
    return { success: true, errors: [], data: user };
  }
}
