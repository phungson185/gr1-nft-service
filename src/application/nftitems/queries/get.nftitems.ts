import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseResultPagination, PaginationDto } from '../../../domain/dtos';
import { NftItemDocument, NftItems } from '../../../domain/schemas/nftItem.schema';
import { GetNftItemsDto, NftItemDto } from '../dtos';

export class GetNftItems implements IQuery {
  constructor(public payload: GetNftItemsDto) {}
}

@QueryHandler(GetNftItems)
export class GetNftItemsHandler implements IQueryHandler<GetNftItems> {
  constructor(
    @InjectModel(NftItems.name)
    private readonly nftItemModel: Model<NftItemDocument>,
  ) {}

  async execute(param: GetNftItems): Promise<BaseResultPagination<NftItemDto>> {
    const result = new BaseResultPagination<NftItemDto>();
    const {
      search,
      owner,
      page,
      size,
      orderBy,
      desc,
    }: GetNftItemsDto = param.payload;
    const skipIndex = size * (page - 1);
    const queryNft: FilterQuery<NftItemDocument> = {};

    if (search) {
      queryNft.name = new RegExp(search, 'i');
    }
    if (owner) {
      queryNft.owner.address = { $eq: owner.toLowerCase() };
    }
    const total = await this.nftItemModel.countDocuments(queryNft);

    const nftMarketItems = await this.nftItemModel
      .find(queryNft)
      .skip(skipIndex)
      .limit(size)
      .exec();

    result.data = new PaginationDto<any>(nftMarketItems, total, page, size);
    return result;
  }
}
