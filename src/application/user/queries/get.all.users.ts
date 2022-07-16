import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { PaginationDto } from 'src/domain/dtos/paginationdto';
import { BaseResult } from '../../../domain/dtos/base.result';
import { User, UserDocument } from '../../../domain/schemas';
import { GetAllUsersDto } from '../dtos/get.all.users';

export class GetAllUsers implements IQuery {
  constructor(public readonly payload: GetAllUsersDto) {}
}

@QueryHandler(GetAllUsers)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsers> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async execute(param: GetAllUsers): Promise<BaseResult<PaginationDto<User>>> {
    const result = new BaseResult<PaginationDto<User>>();
    const query: FilterQuery<UserDocument> = param.payload;
    const { address, size, page } = query;

    let u = await this.userModel
      .find(query)
      .skip(size * (page - 1))
      .limit(size);

    const total = await this.userModel.countDocuments(query);
    const users = new PaginationDto<any>(u, total, page, size);
    result.data = users;
    return result;
  }
}
