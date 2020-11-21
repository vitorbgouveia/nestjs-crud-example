import { ForbiddenException } from '@nestjs/common';

export const validaPermissoes = (user) => {

  if (user) {
    // Verificando permissoes
    const permissao = user.vinculacoes.filter(vinculacao => '');

    if (permissao) {
      return;
    }
  }
  throw new ForbiddenException('Permissão não encontrada');
};
