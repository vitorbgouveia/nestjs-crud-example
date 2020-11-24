import { ForbiddenException } from '@nestjs/common';

export const validPermissions = (user) => {

  if (user) {
    const permission = user.permissions.filter(userPermission => '');

    if (permission) {
      return;
    }
  }
  throw new ForbiddenException('permission not found');
};
