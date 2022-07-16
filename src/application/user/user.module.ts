import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './queries/index';
import { User, UserSchema } from '../../domain/schemas/user.schema';
import { UserController } from './user.controller';
import { CommandHandlers } from './commands/index';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class UserModule {}
