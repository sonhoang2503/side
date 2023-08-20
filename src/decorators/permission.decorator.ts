import { JwtAuthGuard, RolesGuard } from 'src/guards';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ROLES } from '../common/constants/key';
import { UserRole } from '@user.module';

export function Permission(...role: UserRole[]): MethodDecorator {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RolesGuard),
    SetMetadata(ROLES, role),
  );
}
