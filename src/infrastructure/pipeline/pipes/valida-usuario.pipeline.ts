import { ForbiddenException } from '@nestjs/common';

export const validaUsuario = (infoToken) => {

  if (infoToken) {
    const idUser = infoToken.userInfo.idUsuario;
    const user = { vinculacoes: [] };

    if (!user) {
      throw new ForbiddenException('Usuário inválido');
    }
    return user;
  }
  throw new ForbiddenException('Usuário inválido');
};
