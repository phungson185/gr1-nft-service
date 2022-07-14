import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from 'src/domain/schemas/comment.schema';
import { NftItems, NftItemSchema } from '../../domain/schemas';
import {
  SystemConfig,
  SystemConfigSchema,
} from '../../domain/schemas/systemConfig.schema';
import { User, UserSchema } from '../../domain/schemas/user.schema';
import { Web3Module } from '../web3/web3.module';
import { CommandHandlers } from './commands';
import { NftItemController } from './comments.controller';
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
