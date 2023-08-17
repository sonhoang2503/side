import { AutoMap } from '@automapper/classes';
import { UserRole } from '../enums/user';
import { AbstractDto } from '@dtos';

export class UserDto extends AbstractDto {
  @AutoMap()
  name?: string;

  @AutoMap()
  email?: string;

  @AutoMap()
  phoneNumber?: string;

  @AutoMap(() => String)
  role?: UserRole;

  @AutoMap()
  isVerify?: boolean;

  @AutoMap()
  avatar?: string;

  @AutoMap()
  department?: string;
}
