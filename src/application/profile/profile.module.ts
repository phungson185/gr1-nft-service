import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from '../../domain/schemas/user.schema';
// import { UploadService } from '../shared/services';
// import { IdleCyberModule } from '../idlecyberproxy/idleCyber.module';
// import { TransferModule } from '../transfer/transfer.module';
// import { TransferService } from '../transfer/transfer.service';
// import {
//   ProcessWithdrawal,
//   ProcessWithdrawalSchema,
// } from 'src/domain/models/process-withdrawal.module';
import { Web3Module } from '../web3/web3.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.signOptions'),
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      // { name: ProcessWithdrawal.name, schema: ProcessWithdrawalSchema },
      { name: User.name, schema: UserSchema },
    ]),
    // IdleCyberModule,
    // TransferModule,
    Web3Module,
  ],
  controllers: [ProfileController],
  // providers: [ProfileService, TransferService, UploadService],
  providers: [ProfileService],
})
export class ProfileModule {}
