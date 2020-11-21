import { ExemploService } from './exemplo.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Exemplo } from './exemplo.entity';
import { AbstractService } from '../abstract/abstract.service';
import { HttpModule } from '@nestjs/common';
import { TesteUtil } from '../shared/test/TesteUtil';
import { query } from 'express';

// let service: ExemploService;

describe('ExemploService', () => {
  const mockRepository = {
    save  : jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  const mockAbstractService = {
    requestService: jest.fn(),
    validarCampoUnico: jest.fn(),
  };

  // Criamos o módulo no método 'beforeEach'.
  // Isso garantirá que o módulo seja criado antes que qualquer teste possa ser executado
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ExemploService,
        {
          provide: AbstractService,
          useValue: mockAbstractService
        },
        {
          provide: getRepositoryToken(Exemplo),
          useValue: mockRepository,
        }
      ],
    }).compile();

    service = module.get<ExemploService>(ExemploService);
  });

  // Pesquisa Todas as Unidades Gestoras com Parâmetros
  describe('pesquisar-avancado', () => {
    it('should be findAll exemplos with filter params', async () => {
      const exmplos = [ TesteUtil.getOneValidexmplo() as FormExemploDto ];

      const createQueryBuilder: any = {
        skip: () => createQueryBuilder,
        take: () => createQueryBuilder,
        andWhere: () => createQueryBuilder,
        getCount: () => [].length,
        getMany: () => [],
      };
      jest.spyOn(mockRepository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);

      const resultexmplos = await service.buscarTodos(1, 50]);
      const expectResult = { count: [].length, registros: [] };
      expect(resultexmplos).toEqual(expectResult);
    });

    it('should be return [] of exemplo', async () => {
      const exmplos = TesteUtil.getAllValidexmplo() as FormExemploDto[];

      const createQueryBuilder: any = {
        skip: () => createQueryBuilder,
        take: () => createQueryBuilder,
        andWhere: () => createQueryBuilder,
        getCount: () => [].length,
        getMany: () => [],
      };
      jest.spyOn(mockRepository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);

      const resultexmplos = await service.buscarTodos(1, 50);
      const expectResult = { count: 0, registros: [] };
      expect(resultexmplos).toEqual(expectResult);
    });
  });

  describe('consultar-por-parametro', () => {
    it('should be findOne exemplo with filter params', async () => {
      const oneexmplo = TesteUtil.getOneValidexmplo() as FormExemploDto;

      mockRepository[`metadata`] = {
        type: Number,
        columns: [{
          propertyName: 'idExemplo'
        }]
      };

      const createQueryBuilder: any = {
        andWhere: () => createQueryBuilder,
        getOne: () => oneexmplo,
      };
      jest.spyOn(mockRepository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);

      const resultexmplo = await service.consultarPorParametro('idExemplo', 1);
      expect(resultexmplo).toEqual(oneexmplo);
    });
  });

  describe('consultar-historico', () => {
    it('should be find history of exemplo', async () => {
      const oneexmplo = TesteUtil.getOneValidexmplo() as FormExemploDto;
      mockAbstractService.requestService.mockResolvedValue({ data: { data: { resultado: oneexmplo } } });

      const exmplo = await service.consultarHistorico({params: {}}, {});
      expect(exmplo).toEqual(oneexmplo);
    });
  });

  describe('save', () => {
    it('should be save a exemplo', async () => {
      const oneexmplo = TesteUtil.getOneValidexmplo() as FormExemploDto;
      mockRepository.save.mockReturnValue(oneexmplo);

      mockAbstractService.requestService.mockResolvedValue({});

      const exmplo = await service.cadastrar(oneexmplo, {}, {});
      expect(exmplo).toEqual(oneexmplo);
    });

    it('should be no save a exemplo', async () => {
      const oneexmplo = TesteUtil.getOneValidexmplo() as FormExemploDto;
      mockRepository.save.mockReturnValue(oneexmplo);

      mockAbstractService.validarCampoUnico.mockResolvedValue({});
      mockAbstractService.requestService.mockImplementation(() => { throw new Error('Error'); });

      let message: any;
      try {
        await service.cadastrar(oneexmplo, {}, {});
      } catch (e) {
        message = e.message;
      }
      expect(message).toBeTruthy();
    });
  });

  describe('update', () => {
    it('should be update a exemplo', async () => {
      const oneexmplo = TesteUtil.getOneValidexmplo() as FormExemploDto;
      jest.spyOn(service, 'consultarPorParametro').mockResolvedValue(oneexmplo);

      mockRepository.save.mockResolvedValue({});

      mockAbstractService.requestService.mockResolvedValue(oneexmplo);

      const exmplo = await service.alterar(oneexmplo, {params: {}}, {});
      expect(exmplo).toEqual(oneexmplo);
    });

    it('should be no update a exemplo', async () => {
      const oneexmplo = TesteUtil.getOneValidexmplo() as FormExemploDto;
      jest.spyOn(service, 'consultarPorParametro').mockResolvedValue(oneexmplo);

      mockRepository.save.mockResolvedValue({});
      mockAbstractService.requestService.mockImplementation(() => { throw new Error('Error'); });

      let message: any;
      try {
        await service.alterar(oneexmplo, {params: {}}, {});
      } catch (e) {
        message = e.message;
      }
      expect(message).toBeTruthy();
    });
  });

  describe('delete', () => {
    it('should be remove a exemplo', async () => {
      mockAbstractService.requestService.mockResolvedValue({ data: { data: { excluir: true } } });

      const oneexmplo = TesteUtil.getOneValidexmplo() as FormExemploDto;
      jest.spyOn(service, 'consultarPorParametro').mockResolvedValue(oneexmplo);

      mockRepository.delete.mockResolvedValue({});

      const exmplo = await service.excluir(1, {params: {}}, {});
      expect(exmplo).toEqual({});
    });


    it('should be no remove with error in requestService[0] a exemplo', async () => {
      mockAbstractService.requestService.mockResolvedValue({ data: { data: { excluir: false } } });

      const oneexmplo = TesteUtil.getOneValidexmplo() as FormExemploDto;
      jest.spyOn(service, 'consultarPorParametro').mockResolvedValue(oneexmplo);

      mockRepository.delete.mockResolvedValue({});

      let message: any;
      try {
        await service.excluir(1, {params: {}}, {});
      } catch (e) {
        message = e.message;
      }
      expect(message).toBeTruthy();
    });

    it('should be no remove with error in delete a exemplo', async () => {
      mockAbstractService.requestService.mockResolvedValue({ data: { data: { excluir: true } } });

      const oneexmplo = TesteUtil.getOneValidexmplo() as FormExemploDto;
      jest.spyOn(service, 'consultarPorParametro').mockResolvedValue(oneexmplo);

      mockRepository.delete.mockImplementation(() => { throw new Error('Error'); });

      let message: any;
      try {
        await service.excluir(1, {params: {}}, {});
      } catch (e) {
        message = e.message;
      }
      expect(message).toBeTruthy();
    });
  });
});