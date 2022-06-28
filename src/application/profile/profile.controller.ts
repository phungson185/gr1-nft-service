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

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('JWT')
  // @ApiOkResponse({
  //   schema: {
  //     allOf: [
  //       {
  //         properties: {
  //           success: { type: 'boolean' },
  //           data: {
  //             type: 'string',
  //           },
  //           errors: { type: 'object' },
  //         },
  //       },
  //     ],
  //   },
  // })
  // @Get()
  // getProfile(@Request() req, @Response() res) {
  //   return res
  //     .status(HttpStatus.OK)
  //     .json({ data: req.user, success: true, errors: [] });
  // }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('JWT')
  // @Put()
  // @ApiOkResponse({
  //   schema: {
  //     allOf: [
  //       {
  //         properties: {
  //           success: { type: 'boolean' },
  //           data: { $ref: getSchemaPath(User) },
  //           errors: { type: 'object' },
  //         },
  //       },
  //     ],
  //   },
  // })
  // @UseInterceptors(
  //   FileFieldsInterceptor([
  //     { name: 'avatar', maxCount: 1 },
  //     { name: 'cover', maxCount: 1 },
  //   ]),
  // )
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       username: { type: 'string' },
  //       bio: { type: 'string' },
  //       playerId: { type: 'string' },
  //       email: { type: 'string' },
  //       address: { type: 'string' },
  //       avatar: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //       cover: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  // async updateProfile(
  //   @Request() req,
  //   @Body() body,
  //   @UploadedFiles()
  //   files: {
  //     avatar?: Express.Multer.File[];
  //     cover?: Express.Multer.File[];
  //   },
  //   @Response() res,
  // ) {
  //   const avatar = files.avatar ? files.avatar[0] : null;
  //   const cover = files.cover ? files.cover[0] : null;
  //   const { username, bio, playerId, email } = body;

  //   const { address } = req.user;
  //   const newUser = await this.profileService.updateProfile({
  //     avatar,
  //     cover,
  //     username,
  //     bio,
  //     playerId,
  //     email,
  //     address,
  //   });
  //   return res
  //     .status(HttpStatus.OK)
  //     .json({ data: newUser, status: true, errors: [] });
  // }
}
