import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands';
import { QueriesHandlers } from './queries';
import {
  NftItems,
  NftItemSchema,
  User,
  UserSchema,
  SystemConfig,
  SystemConfigSchema,
} from '../../domain/schemas';
import { NftItemController } from './nftitems.controller';
import { Web3Module } from '../web3/web3.module';

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
