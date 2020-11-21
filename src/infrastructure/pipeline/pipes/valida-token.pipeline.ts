import { UnauthorizedException } from '@nestjs/common';
import jwt = require('jsonwebtoken');

export const validaToken = (req) => {

  if (req && req.headers.authorization) {
    const token = req.headers.authorization.substr('BEARER '.length);
    const infoToken = jwt.decode(token);

    if (infoToken.iss !== process.env.JWT_ISSUE) {
      throw new UnauthorizedException('Token inválido');
    }

    return infoToken;
  }
  throw new UnauthorizedException('Token inválido');
};
