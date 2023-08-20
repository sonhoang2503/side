import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@user.module';
import { ROLES } from '../common/constants/key';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES, roles);
