import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  collection: 'users',
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
export class User {
  @AutoMap()
  @Prop({ required: true })
  address: string;

  @AutoMap()
  @Prop()
  username: string;

  @AutoMap()
  @Prop()
  avatar: string;

  @AutoMap()
  @Prop()
  cover: string;

  @AutoMap()
  @Prop()
  bio: string;

  @AutoMap()
  @Prop()
  nonce: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
