import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectAppConfig, AppConfiguration } from '../../config/configuration';
import { User, UserDocument } from '../../domain/schemas';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectAppConfig() private appConfiguration: AppConfiguration,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfiguration.jwt.secret,
    });
  }

  async validate(payload: any): Promise<User> {
    const { address } = payload;
    const user = await this.userModel.findOne({ address: address }).exec();
    if(!user) {
      throw new UnauthorizedException();
    } 
    return user;
  }
}
