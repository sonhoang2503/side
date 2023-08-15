import { UserDto } from '@user.module';
import { LoginRequestDto, RegisterRequestDto } from '../dtos/requests';
import { LoginResponseDto } from '../dtos/response/login.dto';

export interface IAuthService {
  login(request: LoginRequestDto): Promise<LoginResponseDto>;
  register(request: RegisterRequestDto): Promise<UserDto>;
}
