import { Example } from './../src/domain/entity/example.entity';

export class TesteUtil {
  static getOneValidExample(): Example {
    return {
      id            : 1,
      name          : 'ok',
      userCreate    : 1,
      dtCreate      : new Date()
    };
  }
}