import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '@user.module';
import { Services } from '@enums';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    @Inject(Services.USER) private readonly _userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(payload: JwtPayload) {
    const { email, sub } = payload;
    const user = await this._userService.getUser({ email, id: sub });

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
