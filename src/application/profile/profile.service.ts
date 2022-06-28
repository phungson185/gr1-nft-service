import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../../domain/schemas/user.schema';
import { UpdateUserDto } from './dto';
import { BaseResult } from '../../domain/dtos';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async getProfileByAddress(address: string): Promise<UserDocument> {
    address = address.toLowerCase();
    const user = await this.userModel.findOne({ address }).exec();
    if (!user) {
      throw new NotFoundException('user is not found');
    }
    return user;
  }
  // async updateProfile(updateUserDto: UpdateUserDto): Promise<User> {
  //   const { address, avatar, cover, email, username, bio, playerId } =
  //     updateUserDto;
  //   const user = await this.userModel.findOne({ address }).exec();
  //   if (!user) {
  //     throw new NotFoundException('User is not found');
  //   }

  //   if (email) {
  //     const duplicatedUser = await this.userModel.findOne({ email }).exec();
  //     if (
  //       duplicatedUser &&
  //       duplicatedUser._id.toString() !== user._id.toString()
  //     ) {
  //       throw new BadRequestException('Email is used by other account');
  //     }
  //   }
  //   let avatarLink = null;
  //   if (avatar) {
  //     Logger.log(`upload avatar of user: ${user._id}`);
  //     avatarLink = await this.uploadService.upload(avatar);
  //     user.avatar = avatarLink;
  //   }
  //   let coverLink = null;
  //   if (cover) {
  //     Logger.log(`upload cover of user: ${user._id}`);
  //     coverLink = await this.uploadService.upload(cover);
  //     user.cover = coverLink;
  //   }

  //   user.email = email;
  //   user.bio = bio;
  //   // user.playerId = playerId;
  //   user.username = username;
  //   const newUser = await user.save();
  //   return newUser;
  // }

  // async loginToGameServer(
  //   userAddress: string,
  //   login: LinkAccountDto,
  // ): Promise<BaseResult<string>> {
  //   const ref = new BaseResult<string>();
  //   let user = await this.userModel.findOne({ address: userAddress });
  //   console.log(user);
  //   if (!user) {
  //     throw new BadRequestException('User does not exist');
  //   }
  //   const data = await this.idleCyberService.loginToGameServer(
  //     userAddress,
  //     login.email,
  //     login.password,
  //   );
  //   if (data.code === 'CONNECT_FAILED') {
  //     throw new BadRequestException(data.error);
  //   }
  //   if (data.code === 'SUCCESS') {
  //     Object.assign(user, data.info);
  //     user.email = login.email;
  //     await this.userModel.findOneAndUpdate({ _id: user.id }, user);
  //   }
  //   ref.data = user.userId;
  //   return ref;
  // }
}
