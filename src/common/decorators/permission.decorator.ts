import { JwtAuthGuard, RolesGuard } from '@guards';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ROLES } from '../constants/key';
import { UserRole } from '@user.module';

export function Permission(...role: UserRole[]): MethodDecorator {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RolesGuard),
    SetMetadata(ROLES, role),
  );
}
