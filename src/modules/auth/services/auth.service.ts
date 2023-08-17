import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from './auth.implement';
import { UserDto, UserService } from '@user.module';
import { Services } from '@enums';
import {
  LoginRequestDto,
  RefresRequestDto,
  RegisterRequestDto,
  LoginUserOAuth2RequestDto,
} from '../dtos/requests';
import { LoginResponseDto } from '../dtos/response';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, JwtTokens } from '../types/jwt.type';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USER) private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  async login(payload: LoginRequestDto): Promise<LoginResponseDto> {
    const validUser = await this._userService.validateLogin(payload);
    const tokens = await this._generateToken({
      email: validUser.email,
      sub: validUser.id,
      role: validUser.role,
    });
    const user = await this._userService.updateUser({
      id: validUser.id,
      refresh_token: tokens.refresh_token,
    });

    return {
      user,
      tokens,
    };
  }

  async loginUserWithSocial(
    payload: LoginUserOAuth2RequestDto,
  ): Promise<LoginResponseDto> {
    let doc = await this._userService.getUser({
      email: payload.email,
      googleID: payload.googleID,
    });

    if (!doc) {
      console.log(doc);
      doc = await this._userService.createUserOnOAuth2(payload);
    }
    const tokens = await this._generateToken({
      email: doc.email,
      sub: doc.id,
      role: doc.role,
    });

    const user = await this._userService.updateUser({
      id: doc.id,
      refresh_token: tokens.refresh_token,
    });

    return {
      user,
      tokens,
    };
  }

  async register(payload: RegisterRequestDto): Promise<UserDto> {
    const user = await this._userService.createUser(payload);
    return user;
  }

  async logount() {}

  async refresh(payload: RefresRequestDto): Promise<LoginResponseDto> {
    const payloadJwt = await this._jwtService.verify(payload.refresh_token, {
      secret: this._configService.get<string>('JWT_SECRET'),
    });

    const tokens = await this._generateToken({
      email: payloadJwt.email,
      sub: payloadJwt.id,
      role: payloadJwt.role,
    });
    const user = await this._userService.updateUser({
      id: payloadJwt.sub,
      refresh_token: tokens.refresh_token,
    });

    if (!user) {
      console.log('no user');
    }
    return {
      user,
      tokens,
    };
  }

  async _generateToken(jwtPayload: JwtPayload): Promise<JwtTokens> {
    const [access_token, refresh_token] = await Promise.all([
      this._jwtService.signAsync(jwtPayload, {
        secret: this._configService.get<string>('JWT_SECRET'),
        expiresIn: this._configService.get<string>(
          'JWT_ACCESS_TOKEN_EXPIRATION',
        ),
      }),
      this._jwtService.signAsync(jwtPayload, {
        secret: this._configService.get<string>('JWT_SECRET'),
        expiresIn: this._configService.get<string>(
          'JWT_REFRESH_TOKEN_EXPIRATION',
        ),
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}
