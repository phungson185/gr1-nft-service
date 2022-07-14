import { BadRequestException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseResult } from '../../../domain/dtos';
import { NftItems, NftItemDocument } from '../../../domain/schemas/nftItem.schema';

export class GetNftItem implements IQuery {
  constructor(public id: string) {}
}

@QueryHandler(GetNftItem)
export class GetNftItemHandler implements IQueryHandler<GetNftItem> {
  constructor(
    @InjectModel(NftItems.name)
    private readonly nftItemModel: Model<NftItemDocument>,
  ) {}

  async execute(param: GetNftItem): Promise<BaseResult<any>> {
    const result = new BaseResult<any>();
    const { id }: GetNftItem = param;
    if (!id) {
      throw new BadRequestException('Item not found');
    }
    const item = await this.nftItemModel.findOne({ _id: id });
    if (!item) {
      throw new BadRequestException('Item not found');
    }

    result.data = item
    return result;
  }
}
