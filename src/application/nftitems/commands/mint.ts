import { BadRequestException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseResult } from '../../../domain/dtos';
import { MintDto } from '../dtos';
import { NftItems, NftItemDocument } from '../../../domain/schemas';
import { Web3Service } from '../../web3/web3.service';

export class Mint {
  constructor(public payload: MintDto) {}
}

@CommandHandler(Mint)
export class MintHandler implements ICommandHandler<Mint> {
  constructor(
    @InjectModel(NftItems.name)
    private readonly nftItemModel: Model<NftItemDocument>,
    private readonly web3Service: Web3Service,
  ) {}

  async execute(command: Mint): Promise<BaseResult<any>> {
    const result = new BaseResult<any>();
    try {
      if (!this.web3Service.isValidAddress(command.payload.creator.address)) {
        throw new BadRequestException('address is not valid');
      }

      const newNftItem = new this.nftItemModel(command.payload)
      newNftItem.save();
      result.data = newNftItem;
      return result;
    } catch (error) {
      throw error;
    }
  }
}
