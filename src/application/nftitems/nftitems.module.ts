import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandHandlers } from './commands';
import { QueriesHandlers } from './queries';

import { NftItems, NftItemSchema } from '../../domain/schemas';
import {
  SystemConfig,
  SystemConfigSchema
} from '../../domain/schemas/systemConfig.schema';
import { User, UserSchema } from '../../domain/schemas/user.schema';
import { Web3Module } from '../web3/web3.module';
import { NftItemController } from './nftitems.controller';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: NftItems.name, schema: NftItemSchema },
      { name: User.name, schema: UserSchema },
      { name: SystemConfig.name, schema: SystemConfigSchema },
    ]),
    Web3Module,
  ],
  providers: [...CommandHandlers, ...QueriesHandlers],
  controllers: [NftItemController],
})
export class NftItemModule {}
