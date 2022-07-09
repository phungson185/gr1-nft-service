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
  async updateProfileByAddress(updateUserDto: UpdateUserDto): Promise<User> {
    const { address, username, bio, avatar, cover } = updateUserDto;
    const user = await this.userModel.findOne({ address }).exec();
    if (!user) {
      throw new NotFoundException('User is not found');
    }

    Object.keys(updateUserDto).forEach(key => {
      if (updateUserDto[key]) {
        user[key] = updateUserDto[key];
      }
    });

    const newUser = await user.save();
    return newUser;
  }
}
