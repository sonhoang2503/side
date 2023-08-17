import { UserDto } from '@user.module';
import {
  LoginRequestDto,
  RegisterRequestDto,
  LoginUserOAuth2RequestDto,
  RefresRequestDto,
} from '../dtos/requests';
import { LoginResponseDto } from '../dtos/response/login.dto';
import { JwtPayload, JwtTokens } from '../types/jwt.type';

export interface IAuthService {
  login(request: LoginRequestDto): Promise<LoginResponseDto>;
  loginUserWithSocial(
    request: LoginUserOAuth2RequestDto,
  ): Promise<LoginResponseDto>;
  register(request: RegisterRequestDto): Promise<UserDto>;
  refresh(request: RefresRequestDto): Promise<LoginResponseDto>;
  _generateToken(payload: JwtPayload): Promise<JwtTokens>;
  logount(): void;
}
