import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class LoginUserOAuth2RequestDto {
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @AutoMap()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  avatar?: string;

  @IsString()
  @IsNotEmpty()
  googleID: string;
}
