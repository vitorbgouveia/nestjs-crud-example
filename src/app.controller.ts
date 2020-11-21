import { Controller, Get, Res, BadRequestException } from '@nestjs/common';
import { getConnection } from 'typeorm';

@Controller('api/status')
export class AppController {

  @Get()
  getHello(@Res() res: any) {
    if (getConnection().isConnected) {
      return res.status(200).json({ message: 'Server Ativo!', data: null});
    }
    throw new BadRequestException(`Erro ao se comunicar com o banco de dados!`);
  }
}
