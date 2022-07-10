import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BaseQueryParams,
  BaseResult,
  BaseResultPagination,
} from '../../../domain/dtos';
import { Comment, CommentDocument } from '../../../domain/schemas';

export class GetComments implements IQuery {
  constructor(public itemId: string, public param: BaseQueryParams) {}
}

@QueryHandler(GetComments)
export class GetCommentsHandler implements IQueryHandler<GetComments> {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async execute(payload: GetComments): Promise<BaseResultPagination<any>> {
    const result = new BaseResult<any>();
    const { orderBy, desc }: BaseQueryParams = payload.param;

    const comments = await this.commentModel
      .find({ itemId: payload.itemId })
      .sort({
        [orderBy]: desc ? -1 : 1,
      });

    result.data = comments;
    return result;
  }
}
