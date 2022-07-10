import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({
  collection: 'comments',
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
export class Comment {
  @AutoMap()
  @Prop({ required: true })
  itemId: mongoose.Schema.Types.ObjectId;

  @AutoMap()
  @Prop({ required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @AutoMap()
  @Prop()
  username: string;

  @AutoMap()
  @Prop({ required: true })
  avatar: string;

  @AutoMap()
  @Prop({ required: true })
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
