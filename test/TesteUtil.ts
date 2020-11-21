import { Exemplo } from '../src/domain/entity/exemplo.entity';

export class TesteUtil {
  static getOneValidExemplo(): Exemplo {
    // Insira aqui as propriedades da classe;
    return {
      id            : 1,
      nome          : 'ok',
      usuarioCriacao: 1,
      dtCriacao     : new Date()
    };
  }
}