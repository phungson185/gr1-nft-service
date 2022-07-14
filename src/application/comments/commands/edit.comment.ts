import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from 'src/domain/schemas/comment.schema';
import { BaseResult } from '../../../domain/dtos';
import { NftItemDocument, NftItems } from '../../../domain/schemas/nftItem.schema';
import { Web3Service } from '../../web3/web3.service';
import { EditCommentDto } from '../dtos/edit.comment.dto';

export class EditComment {
  constructor(public id: string, public payload: EditCommentDto) {}
}

@CommandHandler(EditComment)
export class EditCommentHandler implements ICommandHandler<EditComment> {
  constructor(
    @InjectModel(NftItems.name)
    private readonly nftItemModel: Model<NftItemDocument>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    private readonly web3Service: Web3Service,
  ) {}

  async execute(command: EditComment): Promise<BaseResult<any>> {
    const result = new BaseResult<any>();
    const { content } = command.payload;
    try {
      const comment = await this.commentModel.findById(command.id);
      if (!comment) {
        throw new BadRequestException('comment not found');
      }
      comment.content = content;
      await comment.save();

      result.data = comment;
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
