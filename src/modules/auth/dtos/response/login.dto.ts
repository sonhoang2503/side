import { UserDto } from '@user.module';

export class LoginResponseDto {
  user: UserDto;
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}
