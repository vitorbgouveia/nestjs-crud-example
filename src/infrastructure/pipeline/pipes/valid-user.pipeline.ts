import { ForbiddenException } from '@nestjs/common';

export const validUser = (infoToken) => {

  if (infoToken) {
    const idUser = infoToken.idUser;
    const user = { permissions: ['id'] };

    if (!user) {
      throw new ForbiddenException('Invalid User');
    }
    return user;
  }
  throw new ForbiddenException('Invalid User');
};
