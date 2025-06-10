import { SetMetadata } from '@nestjs/common';
import { UserPermission } from '@prisma/client';

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...permissions: UserPermission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions); 