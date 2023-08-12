import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Matches,
  IsOptional,
} from 'class-validator';
import { UserRole } from '../../enums/user';
import { AutoMap } from '@automapper/classes';
import { VALID_PHONE_REGEX } from '@constants';

export class CreateUserRequestDto {
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @AutoMap()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @Matches(VALID_PHONE_REGEX, {
    message: 'Invalid number format',
  })
  @AutoMap()
  phoneNumber: string;

  @IsOptional()
  @AutoMap(() => String)
  role: UserRole;
}
