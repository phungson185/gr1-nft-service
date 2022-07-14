import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BasicUser } from '../schemas/basicUser';

export type NftItemDocument = NftItems & Document;

@Schema({
  collection: 'nftitems',
  timestamps: true,
  toJSON: {
    transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class NftItems {
  @AutoMap()
  @Prop({ required: true })
  name: string;

  @AutoMap()
  @Prop()
  description: string;

  @AutoMap()
  @Prop()
  tokenId: string;

  @AutoMap()
  @Prop()
  nftContract: string;

  @AutoMap()
  @Prop()
  creator: BasicUser;

  @AutoMap()
  @Prop()
  owner: BasicUser;

  @AutoMap()
  @Prop()
  ownerAddress: string;

  @AutoMap()
  @Prop()
  image: string;

  @AutoMap()
  @Prop()
  transactionHash: string;
}

export const NftItemSchema = SchemaFactory.createForClass(NftItems);
