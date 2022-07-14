import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from 'src/domain/schemas/comment.schema';
import { BaseResult } from '../../../domain/dtos';
import { NftItemDocument, NftItems } from '../../../domain/schemas/nftItem.schema';
import { Web3Service } from '../../web3/web3.service';
import { CreateCommentDto } from '../dtos';

export class CreateComment {
  constructor(public itemId: string, public userId: string, public payload: CreateCommentDto) {}
}

@CommandHandler(CreateComment)
export class CreateCommentHandler implements ICommandHandler<CreateComment> {
  constructor(
    @InjectModel(NftItems.name)
    private readonly nftItemModel: Model<NftItemDocument>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    private readonly web3Service: Web3Service,
  ) {}

  async execute(command: CreateComment): Promise<BaseResult<any>> {
    const result = new BaseResult<any>();
    const { username, content, avatar } = command.payload;
    try {
      const item = await this.nftItemModel.findById(command.itemId);
      if (!item) {
        throw new BadRequestException('item not found');
      }

      const newComment = new this.commentModel({
        username,
        content,
        avatar,
        itemId: command.itemId,
        userId: command.userId,
      });

      await newComment.save();
      result.data = newComment;
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
