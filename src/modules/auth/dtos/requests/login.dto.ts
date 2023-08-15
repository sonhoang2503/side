import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
