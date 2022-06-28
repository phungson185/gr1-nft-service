import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NftItemModule } from './nftitems/nftitems.module';
import { ProfileModule } from './profile/profile.module';
import { SystemModule } from './system/system.module';
@Module({
  imports: [
    AuthModule,
    SystemModule,
    NftItemModule,
    ProfileModule
  ],
})
export class ApplicationModule {}
