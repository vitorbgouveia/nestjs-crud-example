import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { HttpModule, HttpService, INestApplication, HttpStatus } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExemploController } from '../src/exemplo/exemplo.controller';
import { ExemploService } from '../src/exemplo/exemplo.service';
import { AbstractService } from '../src/abstract/abstract.service';
import { Exemplo } from '../src/exemplo/exemplo.entity';
import { TesteUtil } from '../src/shared/test/TesteUtil';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;
  let abstractService: AbstractService;

  const mockAbstractService = {
    requestService: jest.fn(),
    validarCampoUnico: null,
  };

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports     : [AppModule, TypeOrmModule.forFeature([Exemplo]), HttpModule],
      controllers : [ExemploController],
      providers   : [ExemploService, { provide: AbstractService, useValue: mockAbstractService }],
    }).compile();

    app = moduleFixture.createNestApplication();
    httpService = moduleFixture.get<HttpService>(HttpService);
    abstractService = moduleFixture.get<AbstractService>(AbstractService);
    mockAbstractService.validarCampoUnico = abstractService.validarCampoUnico;
    await app.init();
  });

  afterEach(async () => {
    return await app.close();
  });

  describe('Save exemplo', () => {
    it('should be save one exmplo', async () => {
      mockAbstractService.requestService.mockResolvedValue({ data: '' });

      return await request(app.getHttpServer())
        .post('/api/exemplo/1')
        .set('Authorization', 'abc123')
        .send(TesteUtil.getOneValidexmplo())
        .expect(({ body }) => {
          expect(body.data.id).toBeDefined();
        })
        .expect(HttpStatus.OK);
    });

    it('Should return list of exemplo', async () => {
      return await request(app.getHttpServer())
        .get('/api/exemplo/1/pesquisar-avancado?page=1&size=50')
        .expect(HttpStatus.OK);
    });

    it('Should update one exemplo', async () => {
      mockAbstractService.requestService.mockResolvedValue({ data: '' });

      const result = await request(app.getHttpServer())
        .get('/api/exemplo/1/consultar-por-parametro?field=id&value=1')
        .set('Authorization', 'abc123')
        .expect(HttpStatus.OK) as any;

      const exmplo = JSON.parse(result.res.text).data as any;
      exmplo.email = 'teste.hoje.com';

      return await request(app.getHttpServer())
        .put('/api/exemplo/1')
        .set('Authorization', 'abc123')
        .send(exmplo)
        .expect(({ body }) => {
          expect(body.data.emailPessoaFisica).toBe('teste.hoje.com');
        })
        .expect(HttpStatus.OK);
    });

    it('Should remove one exemplo', async () => {
      mockAbstractService.requestService.mockResolvedValue({ data: { data: { excluir: true } } });

      return await request(app.getHttpServer())
        .delete('/api/exemplo/1/1')
        .set('Authorization', 'abc123')
        .expect(HttpStatus.OK);
    });

  });

});
