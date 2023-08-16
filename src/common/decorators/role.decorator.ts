import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@user.module';
import { ROLES } from '../constants/key';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES, roles);
