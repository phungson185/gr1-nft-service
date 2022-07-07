import { BadRequestException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseResult } from '../../../domain/dtos';
import { CreateCommentDto } from '../dtos';
import { NftItems, NftItemDocument } from '../../../domain/schemas';
import { Web3Service } from '../../web3/web3.service';
import { BasicComment } from 'src/domain/schemas/basicComment';

export class CreateComment {
  constructor(public payload: CreateCommentDto) {}
}

@CommandHandler(CreateComment)
export class CreateCommentHandler implements ICommandHandler<CreateComment> {
  constructor(
    @InjectModel(NftItems.name)
    private readonly nftItemModel: Model<NftItemDocument>,
    private readonly web3Service: Web3Service,
  ) {}

  async execute(command: CreateComment): Promise<BaseResult<any>> {
    const result = new BaseResult<any>();
    const { userAddress, content, itemId } = command.payload;
    try {
      if (!this.web3Service.isValidAddress(userAddress)) {
        throw new BadRequestException('address is not valid');
      }

      const newComment = new BasicComment();
      newComment.content = content;
      newComment.userAddress = userAddress;

      await this.nftItemModel.updateOne(
        { _id: itemId },
        { $push: { "comments": newComment } },
      );

      result.data = {
        itemId,
        userAddress,
        content,
      };
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
