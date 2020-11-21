import { Repository } from 'typeorm';

import { GerenciadorIdentidade } from '../gerenciador-identidade';

import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CrudRequest } from '@nestjsx/crud';

import { operators } from '../crudEnums';

export class CrudService<T> extends TypeOrmCrudService<T> {

  constructor(private repository: Repository<T>) {
    super(repository);
  }

  getNameEntidade() {
    return this.repository.metadata.discriminatorValue;
  }

  getDbCol(propertyName) {
    return this.repository.metadata.columns.filter(col => col.propertyName === propertyName)[0];
  }

  getOne(req): Promise<any> {
    return this.repository.findOne(req.parsed.paramsFilter[0].value)
      .then(result => {
        return { message: 'Consulta realizada!', result };
      })
      .catch(err => this.throwBadRequestException(err) );
  }

  getMany(req: CrudRequest): Promise<any> {
    const queryB = this.repository.createQueryBuilder();

    for (const join of req.parsed.join) {
      let columnRelation = this.getNameEntidade();
      join.field.split('.').map(relation => {
        queryB.leftJoinAndSelect(`${columnRelation}.${relation}`, `${relation}`);
        columnRelation = relation;
      });
    }

    for (const sort of req.parsed.sort) {
      queryB.addOrderBy(`"${this.getNameEntidade()}"."${this.getDbCol(sort.field).databaseName}"`, sort.order);
    }

    for (const filter of req.parsed.filter) {
      queryB.andWhere(`"${
        this.getNameEntidade()}"."${this.getDbCol(filter.field).databaseName}" ${operators[filter.operator](filter.field, filter.value)}`);
    }

    return queryB.getMany()
      .then((result: T[]) => {
        return { message: 'Consulta realizada!', result };
      })
      .catch(err => this.throwBadRequestException(err) );
  }

  createMany(req, form): Promise<any> {
    for (const entity of form.bulk) {
      entity[`usuarioCriacao`] = GerenciadorIdentidade.getUsuarioCriacao(null, '');
    }

    const entityInsert = this.repository.manager.create(this.repository.metadata.target, form.bulk);
    return this.repository.manager.save(entityInsert)
      .then((result: T[]) => {
        return { message: 'Cadastrado com sucesso!', result };
      })
      .catch(err => this.throwBadRequestException(err) );
  }

  updateOne(req, form): Promise<any> {
    return this.repository.save(form)
      .then(result => {
        return { message: 'Atualizado com sucesso!', result };
      })
      .catch(err => this.throwBadRequestException(err) );
  }

  replaceOne(req, form): Promise<any> {
    return this.repository.update(req.parsed.paramsFilter[0].value, form)
      .then(result => {
        return { message: 'Sobrescrito com sucesso!', result };
      })
      .catch(err => this.throwBadRequestException(err) );
  }

  deleteOne(req): Promise<any> {
    return this.repository.delete(req.parsed.paramsFilter[0].value)
      .then(result => {
        return { message: 'Removido com sucesso!', result };
      })
      .catch(err => this.throwBadRequestException(err) );
  }

}
