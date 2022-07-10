import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule, QueryHandler } from '@nestjs/cqrs';
import { CommandHandlers } from './commands';
import {
  NftItems,
  NftItemSchema,
  User,
  UserSchema,
  SystemConfig,
  SystemConfigSchema,
} from '../../domain/schemas';
import { NftItemController } from './comments.controller';
import { Web3Module } from '../web3/web3.module';
import { Comment, CommentSchema } from 'src/domain/schemas/comment.schema';
import { QueryHandlers } from './queries';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: NftItems.name, schema: NftItemSchema },
      { name: User.name, schema: UserSchema },
      { name: SystemConfig.name, schema: SystemConfigSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
    Web3Module,
  ],
  providers: [...CommandHandlers, ...QueryHandlers],
  controllers: [NftItemController],
})
export class CommentModule {}
