import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from './auth.implement';
import { UserDto, UserService } from '@user.module';
import { Services } from '@enums';
import { LoginRequestDto, RegisterRequestDto } from '../dtos/requests';
import { LoginResponseDto } from '../dtos/response';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
    @Inject(Services.USER) private readonly _userService: UserService,
  ) {}

  async login(request: LoginRequestDto): Promise<LoginResponseDto> {
    const validUser = await this._userService.validateLogin(request);
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

  async register(request: RegisterRequestDto): Promise<UserDto> {
    const user = await this._userService.createUser(request);
    return user;
  }

  async logount() {}

  async refresh(refresh_token) {
    const payload = await this._jwtService.verify(refresh_token, {
      secret: this._configService.get<string>('JWT_SECRET'),
    });

    const tokens = await this._generateToken({
      email: payload.email,
      sub: payload.id,
      role: payload.role,
    });
    const user = await this._userService.updateUser({
      id: payload.sub,
      refresh_token: tokens.refresh_token,
    });

    if (!user) {
      console.log('no user');
    }
    return tokens;
  }

  async _generateToken(jwtPayload: JwtPayload) {
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
