import { NotFoundException } from '@nestjs/common';
import { CommandHandler, IQuery, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseResult } from '../../../domain/dtos/base.result';
import { User, UserDocument } from '../../../domain/schemas/user.schema';
import { UpdateUserDto } from '../dtos/update.user.dto';

export class UpdateUser implements IQuery {
  constructor(
    public readonly id: string,
    public readonly queries: UpdateUserDto,
  ) {}
}

@CommandHandler(UpdateUser)
export class UpdateUserHandler implements IQueryHandler<UpdateUser> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async execute(param: UpdateUser): Promise<BaseResult<User>> {
    const result = new BaseResult<User>();

    const user = await this.userModel.findOneAndUpdate(
      { _id: param.id },
      param.queries,
      { new: true },
    );

    if (!user) {
      throw new NotFoundException();
    }

    await user.save();

    result.data = user;
    return result;
  }
}
